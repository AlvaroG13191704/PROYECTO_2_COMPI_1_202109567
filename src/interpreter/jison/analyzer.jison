%{
  import {Root} from '../Symbol/Root';
  import {Type} from '../Symbol/Type';
  import {TypePrimitive} from '../Symbol/TypePrimitive';
  import {VariableDeclaration} from '../Instructions/VariableDeclaration';
  import {Print} from '../Instructions/Print';
  import {LiteralValue} from '../Expressions/LiteralValue';
  import {VariableAccess} from '../Expressions/VariableAccess';
  import {Arithmetic} from '../Expressions/Arithmetic';
%}
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
      console.log("Parse de Jison entrada: OK ");
      let root = new Root($1);
      $$ = root;
      return root;
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
         | CALLBACK    ';' { $$ = $1; }
         | IF              { $$ = $1; }
         | SWITCH          { $$ = $1; }
         | WHILE           { $$ = $1; }
         | FOR             { $$ = $1; }
         | DOWHILE         { $$ = $1; }
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
              $$ = new VariableDeclaration($1, $2, $4, @2.first_line, @2.first_column);
            }
            | TYPE id 
            {
              $$ = new VariableDeclaration($1, $2, undefined, @2.first_line, @2.first_column);
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
            | TYPE'['']' id '=' t_new TYPE'[' EXP ']' 
            {
              $$ = {
                type: 'declaration vector 1',
                type_: $1,
                id: $4,
                exp: $9,
              }
            }
            | TYPE'['']' id '=' '{' LISTEXP '}' 
            {
              $$ = {
                type: 'declaration vector 2',
                id: $4,
                exps: $7
              }
            }
            | t_list '<' TYPE '>' id '=' t_new t_list '<' TYPE '>'
            {
              $$ = {
                type: 'declaration list ',
                type_: $3,
                id: $5,
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
              $$ = {
                type: 'assignment',
                id: $1,
                exp: $3
              }
            }
           | id '[' EXP ']' '=' EXP
           {
            $$ = {
              type: 'assignment vector',
              id: $1,
              exp: $3,
              exp2: $6
            }
           }
           | id '[''[' EXP ']'']' '=' EXP
           {
            $$ = {
              type: 'assignment list',
              id: $1,
              exp: $4,
              exp2: $8
            }
           }
           | id '+''+'
           {
            $$ = {
              type: 'increment',
              id: $1
            }
           }
           | id '-''-'
           {
            $$ = {
              type: 'decrement',
              id: $1
            }
           }
           ;

// CONDITIONAL
IF         : t_if '(' EXP ')' SENTENCES_BLOCK
           {
            $$ = {
              type: 'if',
              exp: $3,
              sentences: $5
            }
           }
           | t_if '(' EXP ')' SENTENCES_BLOCK ELSE
           {
            $$ = {
              type: 'if else',
              exp: $3,
              sentences: $5,
              sentences_else: $6
            }
           }
           ;

ELSE      : t_else IF
          {
            let else_sentence = [];
            else_sentence.push($2);
            $$ = else_sentence;
          }
          | t_else SENTENCES_BLOCK
          {
            $$ = $2;
          }
          ;

SWITCH     : t_switch '(' EXP ')' '{' CASES t_default ':' STATEMENTS '}'
            {
              $$ = {
                type: 'switch',
                exp: $3,
                cases: $6,
                statements: $9
              }
            }
           ;

CASES      : CASES t_case EXP ':' STATEMENTS
           {
            $1.push({
              exp: $3,
              statements: $5
            });
            $$ = $1;
           }
           | t_case EXP ':' STATEMENTS
           {
            let arrcases = [];
            arrcases.push({
              exp: $2,
              statements: $4
            });
            $$ = arrcases;
           }
           ;

STATEMENTS : STATEMENTS STATEMENT
            {
              $1.push($2);
              $$ = $1;
            }
            | STATEMENT
            {
              let arrstatements = [];
              arrstatements.push($1);
              $$ = arrstatements;
            }
            ;

STATEMENT   : t_break ';'
            {
              $$ = {
                type: 'break'
              }
            }
            | SENTENCE
            {
              $$ = $1;
            }
            ;

// LOOPS
WHILE       : t_while '(' EXP ')' SENTENCES_BLOCK
            {
              $$ = {
                type: 'while',
                exp: $3,
                sentences: $5
              }
            }
            ;

FOR         : t_for '(' DECLARATION ';' EXP ';' ASSIGNMENT ')' SENTENCES_BLOCK
            {
              $$ = {
                type: 'for',
                declaration: $3,
                exp: $5,
                update: $7,
                sentences: $9
              }
            }
            | t_for '(' ASSIGNMENT ';' EXP ';' ASSIGNMENT ')' SENTENCES_BLOCK
            {
              $$ = {
                type: 'for',
                assigment: $3,
                exp: $5,
                update: $7,
                sentences: $9
              }
            }
            ;

DOWHILE     : t_do SENTENCES_BLOCK t_while '(' EXP ')' ';'
            {
              $$ = {
                type: 'do while',
                sentences: $2,
                exp: $5
              }
            }
            ;

PRINT     : t_print '(' LISTEXP ')' { $$ = new Print($3,@1.first_line, @1.first_column); }
          ;

CALLBACK  : id '[' EXP ']'
          {
            $$ = {
              type: 'access vector',
              id: $1,
              exp: $3
            }
          }
          | id '[''[' EXP ']'']'
          {
            $$ = {
              type: 'access list',
              id: $1,
              exp: $4
            }
          }
          | id '.' t_add '(' EXP ')'
          {
            $$ = {
              type: 'add list',
              id: $1,
              exp: $5
            }
          }
          ;

TYPE      : tint     { $$ = new Type(TypePrimitive.INTENGER);}
          | tdouble  { $$ = new Type(TypePrimitive.DOUBLE);}
          | tboolean { $$ = new Type(TypePrimitive.BOOLEAN);}
          | tchar    { $$ = new Type(TypePrimitive.CHAR);}
          | tstring  { $$ = new Type(TypePrimitive.STRING);}
          ;

EXP       : EXP '+' EXP            { $$ = new Arithmetic($1, $3, $2, @2.first_line, @2.first_column); }
          | EXP '-' EXP            { $$ = new Arithmetic($1, $3, $2, @2.first_line, @2.first_column); }
          | EXP '*' EXP            { $$ = new Arithmetic($1, $3, $2, @2.first_line, @2.first_column); }
          | EXP '/' EXP            { $$ = new Arithmetic($1, $3, $2, @2.first_line, @2.first_column); }
          | EXP '^' EXP            { $$ = new Arithmetic($1, $3, $2, @2.first_line, @2.first_column); }
          | EXP '%' EXP            { $$ = new Arithmetic($1, $3, $2, @2.first_line, @2.first_column); }
          | '-' EXP %prec negative { $$ = $2; }
          | '(' EXP ')'            { $$ = $2; }
          | EXP '==' EXP           { $$ = {type: 'eq', left: $1, right: $3}; }
          | EXP '!=' EXP           { $$ = {type: 'neq', left: $1, right: $3}; }
          | EXP '<=' EXP           { $$ = {type: 'lte', left: $1, right: $3}; }
          | EXP '>=' EXP           { $$ = {type: 'gte', left: $1, right: $3}; }
          | EXP '<' EXP            { $$ = {type: 'lt', left: $1, right: $3}; }
          | EXP '>' EXP            { $$ = {type: 'gt', left: $1, right: $3}; }
          | EXP '&&' EXP           { $$ = {type: 'and', left: $1, right: $3}; }
          | EXP '||' EXP           { $$ = {type: 'or', left: $1, right: $3}; }
          | EXP '?' EXP ':' EXP    { $$ = {type: 'ternary', left: $1, middle: $3, right: $5}; }
          | '!' EXP                { $$ = {type: 'not', exp: $2}; }
          | CALLBACK               { $$ = $1; }
          | id                     { $$ = new VariableAccess($1,@1.first_line, @1.first_column);}
          | integer                { $$ = new LiteralValue($1, "integer", @1.first_line, @1.first_column);}
          | float                  { $$ = new LiteralValue($1, "double", @1.first_line, @1.first_column);}
          | words                  { $$ = new LiteralValue($1, "string", @1.first_line, @1.first_column);}
          | character              { $$ = new LiteralValue($1, "char", @1.first_line, @1.first_column);}
          | t_true                 { $$ = new LiteralValue($1, "true", @1.first_line, @1.first_column);}
          | t_false                { $$ = new LiteralValue($1, "false", @1.first_line, @1.first_column);}
          ;

