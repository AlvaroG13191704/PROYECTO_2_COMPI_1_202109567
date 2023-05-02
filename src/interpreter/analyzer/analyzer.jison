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
"typeof"                        { return 't_typeof'; }
"toString"                      { return 't_toString'; }
"toCharArray"                   { return 't_toCharArray'; }

/* mehtods && callbacks */
"main"                          { return 't_main'; } // only one per program
"void"                          { return 't_void'; }

/* =================== signs and symbols =================== */
/* increment and decrement */
"++"                            {return '++';}
"--"                            {return '--';}
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
  // main
  import { Main } from '../Instructions/Main';
  // INSTRUCTIONS
  import { VariableDeclaration } from '../Instructions/Declaration';
  import { Assigment } from '../Instructions/Assigment';
  import { Print } from '../Instructions/Print';
  import { Cast } from '../Instructions/Cast';
  import { IF } from '../Instructions/ControlSentences/IF';
  import { For } from '../Instructions/LoopSentences/For';
  import { While } from '../Instructions/LoopSentences/While';
  import { DoWhile } from '../Instructions/LoopSentences/DoWhile';
  import { Switch } from '../Instructions/ControlSentences/Switch';
  import { Case } from '../Instructions/ControlSentences/Case';
  import { Break } from '../Instructions/TransferSentences/Break';
  import { Continue } from '../Instructions/TransferSentences/Continue';
  import { Return } from '../Instructions/TransferSentences/Return';
  import { Function } from '../Instructions/Function';
  import { Callback } from '../Instructions/Callback';
  // EXPRESSIONS
  import { Identifier } from '../Expressions/Identifier';
  import { Primitive } from '../Expressions/Primitive';
  import { TernaryOperator } from '../Expressions/TernaryOperator';
  import { Arithmetic } from '../Expressions/Operations/Arithmetic';
  import { Logic } from '../Expressions/Operations/Logic';
  import { Relational } from '../Expressions/Operations/Relational';
  // natives
  import { ToLower } from '../Expressions/Natives/ToLower';
  import { ToUpper } from '../Expressions/Natives/ToUpper';
  import { ToString } from '../Expressions/Natives/ToString';
  import { Truncate } from '../Expressions/Natives/Truncate';
  import { Round } from '../Expressions/Natives/Round';
  import { Typeof } from '../Expressions/Natives/Typeof';
  import { Length } from '../Expressions/Natives/Length';
  // SYmbol
  import { Symbol } from '../TableSymbols/Symbol';

%}
/* =================== ASSOCIATION AND PRECEDENCE OF OPERATORS =================== */
// Incremento y decremento
%left '?' // test
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

SENTENCE : MAIN        ';' { $$ = $1; }
         | DECLARATION ';' { $$ = $1; }
         | ASSIGNMENT  ';' { $$ = $1; }
         | PRINT       ';' { $$ = $1; }
         | INCDEC      ';' { $$ = $1; }
         | IF              { $$ = $1; }
         | SWITCH          { $$ = $1; }
         | FOR             { $$ = $1; }
         | WHILE           { $$ = $1; }
         | DO_WHILE        { $$ = $1; }
         | FUNCTION        { $$ = $1; }
         | CALLBACK    ';' { $$ = $1; }
         | t_break     ';' { $$ = new Break(); }
         | t_continue  ';' { $$ = new Continue(); }
         | t_return    ';' { $$ = new Return(null); }
         | t_return EXP';' { $$ = new Return($2); }
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
              $$ = new Cast($1, $2, $7, $5 ,@1.first_line, @1.first_column);
            }
            ;

ASSIGNMENT : id '=' EXP 
            {
              $$ = new Assigment($1, $3, @1.first_line, @1.first_column);
            }
           ;

INCDEC    : id '++'     { $$ = new Assigment($1,new Arithmetic(new Identifier($1,@1.first_line, @1.first_column),new Primitive(1, "INTEGER", @1.first_line, @1.first_column),false,@1.first_line, @1.first_column,"+"),@1.first_line, @1.first_column ); }
          | id '--'     { $$ = new Assigment($1,new Arithmetic(new Identifier($1,@1.first_line, @1.first_column),new Primitive(1, "INTEGER", @1.first_line, @1.first_column),false,@1.first_line, @1.first_column,"-"),@1.first_line, @1.first_column ); }
          ;

PRINT     : t_print '(' EXP ')' { $$ = new Print($3,@1.first_line, @1.first_column); }
          ;

// CONDITIONAL
// if
IF        : t_if '(' EXP ')' '{' SENTENCES '}' { $$ = new IF($3,$6,[],@1.first_line, @1.last_column);}
          | t_if '(' EXP ')' '{' SENTENCES '}' t_else '{' SENTENCES '}' { $$ = new IF($3,$6,$10,@1.first_line, @1.last_column);}
          | t_if '(' EXP ')' '{' SENTENCES '}' t_else IF { $$ = new IF($3,$6,[$9],@1.first_line, @1.last_column);}
          ;
// switch
SWITCH    : t_switch '(' EXP ')' '{' CASE_LIST '}'            { $$ = new Switch($3,$6,null,@1.first_line, @1.last_column); }
          | t_switch '(' EXP ')' '{' CASE_LIST  DEFAULT '}'   { $$ = new Switch($3,$6,$7,@1.first_line, @1.last_column); }
          | t_switch '(' EXP ')' '{' DEFAULT '}'              { $$ = new Switch($3,[],$6,@1.first_line, @1.last_column); }
          ;

CASE_LIST : CASE_LIST CASE { $1.push($2); $$ = $1; }
          | CASE { let arrCase = []; arrCase.push($1); $$ = arrCase; }
          ;

CASE      : t_case EXP ':' SENTENCES { $$ = new Case($2,$4,@1.first_line, @1.last_column); }
          ;

DEFAULT   : t_default ':' SENTENCES { $$ = new Case(null,$3,@1.first_line, @1.last_column); }
          ;

// loops
// for
FOR       : t_for '(' DEC_ASSING_FOR  ';' EXP ';' UPDATE_FOR ')' '{' SENTENCES '}' { $$ = new For($3,$5,$7,$10,@1.first_line, @1.last_column); }
          ;

DEC_ASSING_FOR : TYPE id '=' EXP { $$ = new VariableDeclaration($1, $2, $4, @1.first_line, @1.first_column); }
               | id '=' EXP { $$ = new Assigment($1, $3, @1.first_line, @1.first_column); }
               | { $$ = null; }
               ;

UPDATE_FOR     : id '++'     { $$ = new Assigment($1,new Arithmetic(new Identifier($1,@1.first_line, @1.first_column),new Primitive(1, "INTEGER", @1.first_line, @1.first_column),false,@1.first_line, @1.first_column,"+"),@1.first_line, @1.first_column ); }
               | id '--'     { $$ = new Assigment($1,new Arithmetic(new Identifier($1,@1.first_line, @1.first_column),new Primitive(1, "INTEGER", @1.first_line, @1.first_column),false,@1.first_line, @1.first_column,"-"),@1.first_line, @1.first_column );}
               | id '=' EXP  { $$ = new Assigment($1, $3, @1.first_line, @1.first_column); }
               ;
// while

WHILE     : t_while '(' EXP ')' '{' SENTENCES '}' { $$ = new While($3,$6,@1.first_line, @1.last_column); }
          ;

// DO WHILE
DO_WHILE  : t_do '{' SENTENCES '}' t_while '(' EXP ')' ';' { $$ = new DoWhile($3,$7,@1.first_line, @1.last_column); }
          ;

// functions 

FUNCTION  : TYPE id '(' LIST_PARAM ')' '{' SENTENCES '}'  { $$ = new Function(2,$1,$2,$4,false,$7,@1.first_line, @1.last_column); }
          | TYPE id '(' ')' '{' SENTENCES '}'          { $$ = new Function(2,$1,$2,[],false,$6,@1.first_line, @1.last_column); }
          | t_void id '(' LIST_PARAM ')' '{' SENTENCES '}'{ $$ = new Function(3,$1,$2,$4,true,$7,@1.first_line, @1.last_column); }
          | t_void id '(' ')' '{' SENTENCES '}'        { $$ = new Function(3,$1,$2,[],true,$6,@1.first_line, @1.last_column); }
          ;

LIST_PARAM : LIST_PARAM ',' TYPE id {$$ = $1; $$.push(new Symbol(6, $3, $4, null))}
           | TYPE id {$$ = []; $$.push(new Symbol(6, $1, $2, null))}
           ;

CALLBACK  : id '(' LISTEXP ')' { $$ = new Callback($1,$3,@1.first_line, @1.last_column); }
          | id '(' ')' { $$ = new Callback($1,[],@1.first_line, @1.last_column); }
          | t_toLower '(' EXP ')'  {$$ = new ToLower($3,@1.first_line, @1.first_column);}
          | t_toUpper '(' EXP ')'  {$$ = new ToUpper($3,@1.first_line, @1.first_column);}
          | t_toString '(' EXP ')' {$$ = new ToString($3,@1.first_line, @1.first_column);}
          | t_truncate '(' EXP ')' {$$ = new Truncate($3,@1.first_line, @1.first_column);}
          | t_round '(' EXP ')'    {$$ = new Round($3,@1.first_line, @1.first_column);}
          | t_typeof '(' EXP ')'   {$$ = new Typeof($3,@1.first_line, @1.first_column);}
          | t_length '(' EXP ')'   {$$ = new Length($3,@1.first_line, @1.first_column);}
          ;

LISTEXP    : LISTEXP ',' EXP
           {
            $$ = $1;
            $$.push($3);
           }
           | EXP
           {
            $$ = [];
            $$.push($1);
           }
           ;

TYPE      : tint     { $$ = new Type("INTEGER");}
          | tdouble  { $$ = new Type("DOUBLE");}
          | tboolean { $$ = new Type("BOOLEAN");}
          | tchar    { $$ = new Type("CHAR");}
          | tstring  { $$ = new Type("STRING");}
          ;

MAIN      : t_main CALLBACK { $$ = new Main($2,@1.first_line, @1.last_column); }
          ;

EXP       : EXP '+' EXP            { $$ = new Arithmetic($1,$3,false,@1.first_line, @1.first_column,"+"); }
          | EXP '-' EXP            { $$ = new Arithmetic($1,$3,false,@1.first_line, @1.first_column,"-"); }
          | EXP '*' EXP            { $$ = new Arithmetic($1,$3,false,@1.first_line, @1.first_column,"*"); }
          | EXP '/' EXP            { $$ = new Arithmetic($1,$3,false,@1.first_line, @1.first_column,"/");}
          | EXP '^' EXP            { $$ = new Arithmetic($1,$3,false,@1.first_line, @1.first_column,"^"); }
          | EXP '%' EXP            { $$ = new Arithmetic($1,$3,false,@1.first_line, @1.first_column,"%"); }
          | '-' EXP %prec negative { $$ = new Arithmetic($2,null,true,@1.first_line, @1.first_column,"UNARY"); }
          | INCDEC                 { $$ = $1; }
          | '(' EXP ')'            { $$ = $2; }
          | EXP '==' EXP           { $$ = new Relational($1,$3,false,@1.first_line, @1.first_column,"=="); }
          | EXP '!=' EXP           { $$ = new Relational($1,$3,false,@1.first_line, @1.first_column,"!="); }
          | EXP '<=' EXP           { $$ = new Relational($1,$3,false,@1.first_line, @1.first_column,"<="); }
          | EXP '>=' EXP           { $$ = new Relational($1,$3,false,@1.first_line, @1.first_column,">="); }
          | EXP '<' EXP            { $$ = new Relational($1,$3,false,@1.first_line, @1.first_column,"<"); }
          | EXP '>' EXP            { $$ = new Relational($1,$3,false,@1.first_line, @1.first_column,">"); }
          | EXP '&&' EXP           { $$ = new Logic($1,$3,false,@1.first_line, @1.first_column,"&&"); }
          | EXP '||' EXP           { $$ = new Logic($1,$3,false,@1.first_line, @1.first_column,"||"); }
          | '!' EXP                { $$ = new Logic($2,null,true,@1.first_line, @1.first_column,"!"); }
          | EXP '?' EXP ':' EXP    { $$ = new TernaryOperator($1,$3,$5,@1.first_line, @1.first_column); }
          | CALLBACK               { $$ = $1; }
          | id                     { $$ = new Identifier($1,@1.first_line, @1.first_column);}
          | integer                { $$ = new Primitive(parseInt($1), "INTEGER", @1.first_line, @1.first_column);}
          | float                  { $$ = new Primitive(parseFloat($1), "DOUBLE", @1.first_line, @1.first_column);}
          | words                  { $$ = new Primitive($1, "STRING", @1.first_line, @1.first_column);}
          | character              { $$ = new Primitive($1, "CHAR", @1.first_line, @1.first_column);}
          | t_true                 { $$ = new Primitive(true, "BOOLEAN", @1.first_line, @1.first_column);}
          | t_false                { $$ = new Primitive(false, "BOOLEAN", @1.first_line, @1.first_column);}
          ;