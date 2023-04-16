
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
"=="                            {return '==';}
"!="                            {return '!=';}
"<"                             {return '<';}
"<="                            {return '<=';}
">"                             {return '>';}
">="                            {return '>=';}
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
%left '!=' '==' '==='
%left '>' '<' '<=' '>=' 
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
      let raiz = $1
      $$ = raiz;
      console.log($$)
      return raiz;
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
         | error      ';' 
          {
            console.error('Este es un error sintáctico: ' + yytext + ', en la linea: ' + this.$.first_line + ', en la columna: ' + this.$.first_column);
            $$ = null;
          }
         ;

DECLARATION : TYPE id '=' EXP
            {
              $$ = {
                type: 'declaration',
                value: $1,
                id: $2,
                exp: $4
              }
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
            | TYPE id 
            {
              $$ = {
                type: 'declaration',
                value: $1,
                id: $2
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

TYPE      : tint     { $$ = $1;}
          | tdouble  { $$ = $1;}
          | tboolean { $$ = $1;}
          | tchar    { $$ = $1;}
          | tstring  { $$ = $1;}
          ;

EXP       : EXP '+' EXP            { $$ = {type: 'add', left: $1, right: $3}; }
          | EXP '-' EXP            { $$ = {type: 'sub', left: $1, right: $3}; }
          | EXP '*' EXP            { $$ = {type: 'mul', left: $1, right: $3}; }
          | EXP '/' EXP            { $$ = {type: 'div', left: $1, right: $3}; }
          | EXP '^' EXP            { $$ = {type: 'pow', left: $1, right: $3}; }
          | EXP '%' EXP            { $$ = {type: 'mod', left: $1, right: $3}; }
          | '-' EXP %prec negative { $$ = {type: 'negative', value: $2}; }
          | '(' EXP ')'            { $$ = $2; }
          | EXP '==' EXP           { $$ = {type: 'eq', left: $1, right: $3}; }
          | EXP '!=' EXP           { $$ = {type: 'neq', left: $1, right: $3}; }
          | EXP '<' EXP            { $$ = {type: 'lt', left: $1, right: $3}; }
          | EXP '>' EXP            { $$ = {type: 'gt', left: $1, right: $3}; }
          | EXP '<=' EXP           { $$ = {type: 'lte', left: $1, right: $3}; }
          | EXP '>=' EXP           { $$ = {type: 'gte', left: $1, right: $3}; }
          | EXP '&&' EXP           { $$ = {type: 'and', left: $1, right: $3}; }
          | EXP '||' EXP           { $$ = {type: 'or', left: $1, right: $3}; }
          | EXP '?' EXP ':' EXP    { $$ = {type: 'ternary', left: $1, middle: $3, right: $5}; }
          | '!' EXP                { $$ = {type: 'not', exp: $2}; }
          | id                     { $$ = $1;}
          | integer                { $$ = $1;}
          | float                  { $$ = $1;}
          | words                  { $$ = $1;}
          | t_true                 { $$ = $1;}
          | t_false                { $$ = $1;}
          | character              { $$ = $1;}
          ;

