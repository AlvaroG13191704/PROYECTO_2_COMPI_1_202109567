
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
<<EOF>>                        { return 'EOF'; }  /* end of file */

/* Comments */
"//".*                            {/* skip comments */}
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/]    {/* IGNORE */}

/* =================== Regular expresions =================== */
([a-zA-ZÑñ]|("_"[a-zA-ZÑñ]))([a-zA-ZÑñ]|[0-9]|"_")*             yytext = yytext.toLowerCase();          return 't_id';
\"(?:[{kOpen}|{kEnd}]|["\\"]["bnrt/["\\"]]|[^"["\\"])*\"         yytext = yytext.substr(1,yyleng-2);    return 't_stringWord'; // substr to remove the quotes
\'(?:{esc}["bfnrt/{esc}]|{esc}"u"[a-fA-F0-9]{4}|[^"{esc}])\'    yytext = yytext.substr(1,yyleng-2);     return 't_character'// substr to remove the quotes
{int}{frac}\b                                                                                           return 't_float'
{int}\b                                                                                                 return 't_integer'
\"([^\"\\]|\\.)*\"                                                                                      return 't_scapeSecuence'

/* =================== Reserved words =================== */
/* Data types */
"int"                           { return 't_int'; }        // default 0
"double"                        { return 't_double'; }    // default 0.0
"boolean"                       { return 't_boolean'; }  // default True
"char"                          { return 't_char'; }    // default '\u0000'
"string"                        { return 't_string'; } // default ""

/* Scape secuences */
"\\n"                           { return 't_newline'; }
"\\\\"                          { return 't_backslash'; }
"\\\""                          { return 't_double_quote'; }
"\\t"                           { return 't_tab'; }
"\\'"                           { return 't_single_quote'; }

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
"main"                          { return 't_main'; } // only one per program

/* mehtods */
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

.                               {console.error('Este es un error léxico: ' + yytext + ', en la linea: ' + yylloc.first_line + ', en la columna: ' + yylloc.first_column);}

/lex

/* =================== ASSOCIATION AND PRECEDENCE OF OPERATORS =================== */
/* logic operators */
%left '++' '--'
%left '^'
%left '||'
%left '&&'
%left '!=' '=='
%left '>' '<' '<=' '>=' 

/* arithmetic operators */
%left '+' '-'
%left '*' '/' '%'
%right '^^' 
%right UMINUS '!' '(' 

/* =================== GRAMMAR =================== */

%start INIT

%% /* =================== LEFT RECURSIVITY =================== */

INIT: t_add EOF
    {
        console.log("Parse de Jison entrada: OK ");
    }
;

