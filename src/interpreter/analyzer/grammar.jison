
Terminales = {
  INIT, SENTENCES , SENTENCE, MAIN , DECLARATION, ASSIGNMENT, PRINT, INCDEC, IF, SWITCH, FOR, WHILE,
  DO_WHILE, FUNCTION, CALLBACK, TYPE, EXP, LISTEXP, CASE_LIST, DEFAULT, DEC_ASSING_FOR, LIST_PARAM
}

No Terminales = {
  t_break, t_continue, t_return, id, '=', '(', ')', '{', '}', ';', ',', '[', ']', '++', '--', 
  't_print', 't_if', 't_else', 't_switch', 't_case', 't_default', 't_for', 't_while', 't_do', 't_void', 't_int', 't_double', 
  't_boolean', 't_char', 't_string', 't_true', 't_false', '+', '-', '*', '/', '^', '%', '==', '!=', '<=', '>=', 
  '<', '>', '&&', '||', '!', '?', ':', 'new', 'list', 'toCharArray', 'add', 'toLower', 'toUpper', 'toString', 
  't_truncate', 't_round', 't_typeof', 't_length', 't_main', 't_return', 't_break', 't_continue', 't_print', 't_if', 't_else', 't_switch', 
  't_return', t_break , t_continue 
}

INIT -> SENTENCES

SENTENCES -> SENTENCES SENTENCE    

SENTENCE -> MAIN        
         | DECLARATION 
         | ASSIGNMENT  
         | PRINT       
         | INCDEC      
         | IF          
         | SWITCH       
         | FOR         
         | WHILE       
         | DO_WHILE    
         | FUNCTION    
         | CALLBACK    
         | t_break   
         | t_continue  
         | t_return    
         | t_return EXP

DECLARATION -> TYPE id '=' EXP
            | TYPE id 
            | TYPE id '=' '(' TYPE ')' EXP 
            | TYPE'['']' id '=' t_new TYPE'[' EXP ']'
            | TYPE'['']' id '=' '{' LISTEXP '}'
            | t_list '<' TYPE '>' id '=' t_new t_list '<' TYPE '>'
            | t_list '<' TYPE '>' id '=' t_toCharArray '(' EXP ')'

ASSIGNMENT -> id '=' EXP 
           | id '[' EXP ']' '=' EXP 
           | id '[''[' EXP ']'']' '=' EXP 

INCDEC    -> id '++'     
          | id '--'     
          

PRINT    -> t_print '(' EXP ')'


IF       -> t_if '(' EXP ')' '{' SENTENCES '}' 
          | t_if '(' EXP ')' '{' SENTENCES '}' t_else '{' SENTENCES '}' 
          | t_if '(' EXP ')' '{' SENTENCES '}' t_else IF 


SWITCH   -> t_switch '(' EXP ')' '{' CASE_LIST '}'             
          | t_switch '(' EXP ')' '{' CASE_LIST  DEFAULT '}'   
          | t_switch '(' EXP ')' '{' DEFAULT '}'              
          

CASE_LIST -> CASE_LIST CASE 
          | CASE 
          

CASE      -> t_case EXP ':' SENTENCES 
          

DEFAULT   -> t_default ':' SENTENCES 
      

FOR       -> t_for '(' DEC_ASSING_FOR  ';' EXP ';' UPDATE_FOR ')' '{' SENTENCES '}' 


DEC_ASSING_FOR -> TYPE id '=' EXP 
               | id '=' EXP 
               ;

UPDATE_FOR    -> id '++'   
               | id '--'   
               | id '=' EXP      


WHILE    -> t_while '(' EXP ')' '{' SENTENCES '}' 


DO_WHILE -> t_do '{' SENTENCES '}' t_while '(' EXP ')' ';' 


FUNCTION  -> TYPE id '(' LIST_PARAM ')' '{' SENTENCES '}'  
          | TYPE id '(' ')' '{' SENTENCES '}'          
          | t_void id '(' LIST_PARAM ')' '{' SENTENCES '}'
          | t_void id '(' ')' '{' SENTENCES '}'       

LIST_PARAM -> LIST_PARAM ',' TYPE id 
           | TYPE id 

CALLBACK  -> id '(' LISTEXP ')' 
          | id '(' ')' 
          | id '[' EXP ']'
          | id '[''[' EXP ']'']'
          | id '.' t_add '(' EXP ')' 
          | t_toLower '(' EXP ')'  
          | t_toUpper '(' EXP ')'  
          | t_toString '(' EXP ')' 
          | t_truncate '(' EXP ')' 
          | t_round '(' EXP ')'    
          | t_typeof '(' EXP ')'   
          | t_length '(' EXP ')'   

LISTEXP   -> LISTEXP ',' EXP
           | EXP

TYPE     -> tint     
          | tdouble  
          | tboolean 
          | tchar    
          | tstring  
          

MAIN      -> t_main CALLBACK 
          

EXP      -> EXP '+' EXP             
          | EXP '-' EXP           
          | EXP '*' EXP             
          | EXP '/' EXP           
          | EXP '^' EXP           
          | EXP '%' EXP            
          | '-' EXP 
          | INCDEC                 
          | '(' EXP ')'            
          | EXP '==' EXP           
          | EXP '!=' EXP           
          | EXP '<=' EXP           
          | EXP '>=' EXP           
          | EXP '<' EXP            
          | EXP '>' EXP            
          | EXP '&&' EXP           
          | EXP '||' EXP           
          | '!' EXP                
          | EXP '?' EXP ':' EXP    
          | CALLBACK               
          | id                     
          | integer                
          | float                 
          | words                  
          | character              
          | t_true                
          | t_false                
