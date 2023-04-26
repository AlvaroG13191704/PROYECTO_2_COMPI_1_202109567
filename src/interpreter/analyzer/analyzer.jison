/* Lexical Definition */
%lex

%options case-insensitive

/* helpers */
digit    [0-9]
digit                       [0-9]
kOpen                        "["
kEnd                         "]"
bOpen                        "{"
bEnd                         "}"
pOpen                        "("
pEnd                         ")"
esc                         "\\"
int                         (?:[0-9]|[1-9][0-9]+)
exp                         (?:[eE][-+]?[0-9]+)
frac                        (?:\.[0-9]+)
%%

/* Tokens */
\s+                            {/* skip whitespace */}

/* Comments */
(\/\/).*                               {/* line comment */}
[ \r\t]                                {/* white space */}
\n                                     {/* white space */}
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/]    {/* multi comment */}

/* =================== Reserved words =================== */
/* Data types */
"int"                           { return 'tint'; }        // default 0
"double"                        { return 'tdouble'; }    // default 0.0
"boolean"                       { return 'tboolean'; }  // default True
"char"                          { return 'tchar'; }    // default '\u0000'
"string"                        { return 'tstring'; } // default ""

/* boolean values */
"true"                          { return 't_true'; }
"false"                         { return 't_false'; }


/* data structures */
"new"                           { return 't_new'; }
"list"                          { return 't_list'; }
"add"                           { return 't_add'; }

/* conditionals */
"if"                            { return 't_if'; }
"else"                          { return 't_else'; }
"switch"                        { return 't_switch'; }
"case"                          { return 't_case'; }
"default"                       { return 't_default'; }

/* loops */
"while"                         { return 't_while'; }
"for"                           { return 't_for'; }
"do"                            { return 't_do'; }

/* transfer sentences */
"break"                         { return 't_break'; }
"continue"                      { return 't_continue'; }
"return"                        { return 't_return'; }

/* functions */
"print"                         { return 't_print'; }
"toLower"                       { return 't_toLower'; }
"toUpper"                       { return 't_toUpper'; }
"length"                        { return 't_length'; }
"truncate"                      { return 't_truncate'; }
"round"                         { return 't_round'; }
"typeOf"                        { return 't_typeOf'; }
"toString"                      { return 't_toString'; }
"toCharArray"                   { return 't_toCharArray'; }

/* mehtods && callbacks */
"main"                          { return 't_main'; } // only one per program
"void"                          { return 't_void'; }

/* =================== signs and symbols =================== */
/* arithmetic operators */
"+"                             {return '+';}
"-"                             {return '-';}
"*"                             {return '*';}
"/"                             {return '/';}
"^"                             {return '^';}
"%"                             {return '%';}
/* relational operators */
"<="                            {return '<=';}
">="                            {return '>=';}
"=="                            {return '==';}
"!="                            {return '!=';}
"<"                             {return '<';}
">"                             {return '>';}
"?"                             {return '?';}
":"                             {return ':';} // ternary operator or any other use
/* logical operators */
"||"                            {return '||';}
"&&"                            {return '&&';}
"!"                             {return '!';}
/* agrupation signs */
"("                             {return '(';}
")"                             {return ')';}
/* assigment and declaration */
"="                             {return '=';}
/* increment and decrement */
"++"                            {return '++';}
"--"                            {return '--';}
/* general signs */
"$"                             {return '$';}
";"                             {return ';';}
","                             {return ',';}
"."                             {return '.';}
"{"                             {return '{';}
"}"                             {return '}';}
"["                             {return '[';}
"]"                             {return ']';}


/* =================== Regular expresions =================== */
([a-zA-ZÑñ]|("_"[a-zA-ZÑñ]))([a-zA-ZÑñ]|[0-9]|"_")*             yytext = yytext.toLowerCase();          return 'id';
\'(?:{esc}["bfnrt/{esc}]|{esc}"u"[a-fA-F0-9]{4}|[^"{esc}])\'    yytext = yytext.substr(1,yyleng-2);     return 'character'// substr to remove the quotes
{int}{frac}\b                                                                                           return 'float'
{int}\b                                                                                                 return 'integer'
\"(?:[{cor1}|{cor2}]|["\\"]["bnrt/["\\"]]|[^"["\\"])*\"         yytext = yytext.substr(1,yyleng-2);     return 'words';

<<EOF>>                        { return 'EOF'; }  /* end of file */ 
.                               {console.error('Este es un error léxico: ' + yytext + ', en la linea: ' + yylloc.first_line + ', en la columna: ' + yylloc.first_column);}

/lex

%{
  import { AST } from '../AST/AST';
  import { Type } from '../TableSymbols/Type';
  // INSTRUCTIONS
  import { VariableDeclaration } from '../Instructions/Declaration';
  import { Assigment } from '../Instructions/Assigment';
  import { Print } from '../Instructions/Print';
  // EXPRESSIONS
  import { Identifier } from '../Expressions/Identifier';
  import { Primitive } from '../Expressions/Primitive';
  import { TernaryOperator } from '../Expressions/TernaryOperator';
  import { Arithmetic } from '../Expressions/Operations/Arithmetic';
%}
/* =================== ASSOCIATION AND PRECEDENCE OF OPERATORS =================== */
// Incremento y decremento
%left '++' '--'

// Operaciones logicas y relacionales
%left '&&'
%left '||'
%left '!=' '==' 
%left '>=', '<=', '<', '>'
%right '!' '('

// Operaciones numericas
%right negative
%nonassoc '^' 
%left '*' '/' '%'
%left '+' '-'
%left '?'

/* =================== GRAMMAR =================== */

%start INIT

%% /* =================== LEFT RECURSIVITY =================== */

INIT: SENTENCES EOF
    {
      let root = new AST($1);
      $$ = root;
      return $$;
    }
    ;

SENTENCES : SENTENCES SENTENCE
          {
            $1.push($2);
            $$ = $1;
          }
          | SENTENCE
          {
            let arr = [];
            arr.push($1);
            $$ = arr;
          }
          ;

SENTENCE : DECLARATION ';' { $$ = $1; }
         | ASSIGNMENT  ';' { $$ = $1; }
         | PRINT       ';' { $$ = $1; }
         ;

SENTENCES_BLOCK : '{' SENTENCES '}'
                {
                  $$ = $2;
                }
                | '{' '}'
                {
                  $$ = [];
                }
                ;

DECLARATION : TYPE id '=' EXP
            {
              $$ = new VariableDeclaration($1, $2, $4, @1.first_line, @1.first_column);
            }
            | TYPE id 
            {
              $$ = new VariableDeclaration($1, $2, null, @1.first_line, @1.first_column);
            }
            | TYPE id '=' '(' TYPE ')' EXP 
            {
              $$ = {
                type: 'declaration with cast',
                type_: $1,
                id: $2,
                type_cast: $5,
                exp: $7
              }
            }
            ;

LISTEXP    : LISTEXP ',' EXP
           {
            $1.push($3);
            $$ = $1;
           }
           | EXP
           {
            let arrlistEXP = [];
            arrlistEXP.push($1);
            $$ = arrlistEXP;
           }
           ;

ASSIGNMENT : id '=' EXP 
            {
              $$ = new Assigment($1, $3, @1.first_line, @1.first_column);
            }
           ;

PRINT     : t_print '(' EXP ')' { $$ = new Print($3,@1.first_line, @1.first_column); }
          ;

CALLBACK  : id '('')'
          {
            $$ = {
              type: 'callback void',
              id: $1,
              exp: $3
            }
          }
          ;

TYPE      : tint     { $$ = new Type("INTEGER");}
          | tdouble  { $$ = new Type("DOUBLE");}
          | tboolean { $$ = new Type("BOOLEAN");}
          | tchar    { $$ = new Type("CHAR");}
          | tstring  { $$ = new Type("STRING");}
          ;

EXP       : EXP '+' EXP            { $$ = new Arithmetic($1,$3,false,@1.first_line, @1.first_column,"+"); }
          | EXP '-' EXP            { $$ = new Arithmetic($1,$3,false,@1.first_line, @1.first_column,"-"); }
          | EXP '*' EXP            { $$ = new Arithmetic($1,$3,false,@1.first_line, @1.first_column,"*"); }
          | EXP '/' EXP            { $$ = new Arithmetic($1,$3,false,@1.first_line, @1.first_column,"/");}
          | EXP '^' EXP            { $$ = new Arithmetic($1,$3,false,@1.first_line, @1.first_column,"^"); }
          | EXP '%' EXP            { $$ = new Arithmetic($1,$3,false,@1.first_line, @1.first_column,"%"); }
          | '-' EXP %prec negative { $$ = new Arithmetic($2,null,true,@1.first_line, @1.first_column,"UNARY"); }
          | '(' EXP ')'            { $$ = $2; }
          | EXP '==' EXP           { $$ = {type: 'eq', left: $1, right: $3}; }
          | EXP '!=' EXP           { $$ = {type: 'neq', left: $1, right: $3}; }
          | EXP '<=' EXP           { $$ = {type: 'lte', left: $1, right: $3}; }
          | EXP '>=' EXP           { $$ = {type: 'gte', left: $1, right: $3}; }
          | EXP '<' EXP            { $$ = {type: 'lt', left: $1, right: $3}; }
          | EXP '>' EXP            { $$ = {type: 'gt', left: $1, right: $3}; }
          | EXP '&&' EXP           { $$ = {type: 'and', left: $1, right: $3}; }
          | EXP '||' EXP           { $$ = {type: 'or', left: $1, right: $3}; }
          | EXP '?' EXP ':' EXP    { $$ = new TernaryOperator($1,$3,$5,@1.first_line, @1.first_column); }
          | '!' EXP                { $$ = {type: 'not', exp: $2}; }
          | CALLBACK               { $$ = $1; }
          | id                     { $$ = new Identifier($1,@1.first_line, @1.first_column);}
          | integer                { $$ = new Primitive($1, "INTEGER", @1.first_line, @1.first_column);}
          | float                  { $$ = new Primitive($1, "DOUBLE", @1.first_line, @1.first_column);}
          | words                  { $$ = new Primitive($1, "STRING", @1.first_line, @1.first_column);}
          | character              { $$ = new Primitive($1, "CHAR", @1.first_line, @1.first_column);}
          | t_true                 { $$ = new Primitive(true, "BOOLEAN", @1.first_line, @1.first_column);}
          | t_false                { $$ = new Primitive(false, "BOOLEAN", @1.first_line, @1.first_column);}
          ;