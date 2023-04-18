/* parser generated by jison 0.3.0 */
/**
 * Returns a Parser implementing JisonParserApi and a Lexer implementing JisonLexerApi.
 */

  import {VariableDeclaration} from '../Instructions/VariableDeclaration';

import { JisonParser, JisonParserApi, StateType, SymbolsType, TerminalsType, ProductionsType, o } from '@ts-jison/parser';const $V0=[1,15],$V1=[1,14],$V2=[1,16],$V3=[1,17],$V4=[1,18],$V5=[1,19],$V6=[1,20],$V7=[1,21],$V8=[1,22],$V9=[1,23],$Va=[1,24],$Vb=[1,25],$Vc=[1,26],$Vd=[5,19,21,30,36,39,47,48,49,50,53,54,55,56,57],$Ve=[5,19,21,30,36,39,41,44,46,47,48,49,50,53,54,55,56,57],$Vf=[1,36],$Vg=[1,38],$Vh=[1,39],$Vi=[1,40],$Vj=[1,46],$Vk=[21,25,26,32],$Vl=[1,56],$Vm=[1,53],$Vn=[1,52],$Vo=[1,54],$Vp=[1,57],$Vq=[1,58],$Vr=[1,59],$Vs=[1,60],$Vt=[1,61],$Vu=[1,62],$Vv=[1,73],$Vw=[8,25],$Vx=[1,92],$Vy=[1,93],$Vz=[1,82],$VA=[1,83],$VB=[1,84],$VC=[1,85],$VD=[1,86],$VE=[1,87],$VF=[1,88],$VG=[1,89],$VH=[1,90],$VI=[1,91],$VJ=[1,94],$VK=[1,95],$VL=[1,96],$VM=[8,19,25,27,31,32,33,34,35,42,58,59,60,61,62,63,64,65,66,67,68],$VN=[5,19,21,30,36,38,39,41,44,46,47,48,49,50,53,54,55,56,57],$VO=[8,19,25,27,31,32,33,42,62,63,64,65,66,67],$VP=[2,44],$VQ=[1,134],$VR=[8,19,25,27,31,32,33,34,35,42,58,59,60,61,62,63,64,65,66,67],$VS=[8,19,25,27,31,32,33,42,58,59,60,61,62,63,64,65,66,67],$VT=[8,19,25,27,33,42,62,63,66,67],$VU=[2,45],$VV=[1,171],$VW=[19,33],$VX=[1,198],$VY=[19,21,30,36,39,41,44,46,47,48,49,50,53,54,55,56,57],$VZ=[41,44];

export class ParserParser extends JisonParser implements JisonParserApi {
    $?: any;

    constructor (yy = {}, lexer = new ParserLexer(yy)) {
      super(yy, lexer);
    }

    symbols_: SymbolsType = {"error":2,"INIT":3,"SENTENCES":4,"EOF":5,"SENTENCE":6,"DECLARATION":7,";":8,"ASSIGNMENT":9,"CALLBACK":10,"IF":11,"SWITCH":12,"WHILE":13,"FOR":14,"DOWHILE":15,"PRINT":16,"SENTENCES_BLOCK":17,"{":18,"}":19,"TYPE":20,"id":21,"=":22,"EXP":23,"(":24,")":25,"[":26,"]":27,"t_new":28,"LISTEXP":29,"t_list":30,"<":31,">":32,",":33,"+":34,"-":35,"t_if":36,"ELSE":37,"t_else":38,"t_switch":39,"CASES":40,"t_default":41,":":42,"STATEMENTS":43,"t_case":44,"STATEMENT":45,"t_break":46,"t_while":47,"t_for":48,"t_do":49,"t_print":50,".":51,"t_add":52,"tint":53,"tdouble":54,"tboolean":55,"tchar":56,"tstring":57,"*":58,"/":59,"^":60,"%":61,"==":62,"!=":63,"<=":64,">=":65,"&&":66,"||":67,"?":68,"!":69,"integer":70,"float":71,"words":72,"t_true":73,"t_false":74,"character":75,"$accept":0,"$end":1};
    terminals_: TerminalsType = {2:"error",5:"EOF",8:";",18:"{",19:"}",21:"id",22:"=",24:"(",25:")",26:"[",27:"]",28:"t_new",30:"t_list",31:"<",32:">",33:",",34:"+",35:"-",36:"t_if",38:"t_else",39:"t_switch",41:"t_default",42:":",44:"t_case",46:"t_break",47:"t_while",48:"t_for",49:"t_do",50:"t_print",51:".",52:"t_add",53:"tint",54:"tdouble",55:"tboolean",56:"tchar",57:"tstring",58:"*",59:"/",60:"^",61:"%",62:"==",63:"!=",64:"<=",65:">=",66:"&&",67:"||",68:"?",69:"!",70:"integer",71:"float",72:"words",73:"t_true",74:"t_false",75:"character"};
    productions_: ProductionsType = [0,[3,2],[4,2],[4,1],[6,2],[6,2],[6,2],[6,1],[6,1],[6,1],[6,1],[6,1],[6,2],[17,3],[17,2],[7,4],[7,2],[7,7],[7,10],[7,8],[7,11],[29,3],[29,1],[9,3],[9,6],[9,8],[9,3],[9,3],[11,5],[11,6],[37,2],[37,2],[12,10],[40,5],[40,4],[43,2],[43,1],[45,2],[45,1],[13,5],[14,9],[14,9],[15,7],[16,4],[10,4],[10,6],[10,6],[20,1],[20,1],[20,1],[20,1],[20,1],[23,3],[23,3],[23,3],[23,3],[23,3],[23,3],[23,2],[23,3],[23,3],[23,3],[23,3],[23,3],[23,3],[23,3],[23,3],[23,3],[23,5],[23,2],[23,1],[23,1],[23,1],[23,1],[23,1],[23,1],[23,1],[23,1]];
    table: Array<StateType> = [{3:1,4:2,6:3,7:4,9:5,10:6,11:7,12:8,13:9,14:10,15:11,16:12,20:13,21:$V0,30:$V1,36:$V2,39:$V3,47:$V4,48:$V5,49:$V6,50:$V7,53:$V8,54:$V9,55:$Va,56:$Vb,57:$Vc},{1:[3]},{5:[1,27],6:28,7:4,9:5,10:6,11:7,12:8,13:9,14:10,15:11,16:12,20:13,21:$V0,30:$V1,36:$V2,39:$V3,47:$V4,48:$V5,49:$V6,50:$V7,53:$V8,54:$V9,55:$Va,56:$Vb,57:$Vc},o($Vd,[2,3]),{8:[1,29]},{8:[1,30]},{8:[1,31]},o($Ve,[2,7]),o($Ve,[2,8]),o($Ve,[2,9]),o($Ve,[2,10]),o($Ve,[2,11]),{8:[1,32]},{21:[1,33],26:[1,34]},{31:[1,35]},{22:$Vf,26:[1,37],34:$Vg,35:$Vh,51:$Vi},{24:[1,41]},{24:[1,42]},{24:[1,43]},{24:[1,44]},{17:45,18:$Vj},{24:[1,47]},o($Vk,[2,47]),o($Vk,[2,48]),o($Vk,[2,49]),o($Vk,[2,50]),o($Vk,[2,51]),{1:[2,1]},o($Vd,[2,2]),o($Ve,[2,4]),o($Ve,[2,5]),o($Ve,[2,6]),o($Ve,[2,12]),{8:[2,16],22:[1,48]},{27:[1,49]},{20:50,53:$V8,54:$V9,55:$Va,56:$Vb,57:$Vc},{10:55,21:$Vl,23:51,24:$Vm,35:$Vn,69:$Vo,70:$Vp,71:$Vq,72:$Vr,73:$Vs,74:$Vt,75:$Vu},{10:55,21:$Vl,23:63,24:$Vm,26:[1,64],35:$Vn,69:$Vo,70:$Vp,71:$Vq,72:$Vr,73:$Vs,74:$Vt,75:$Vu},{34:[1,65]},{35:[1,66]},{52:[1,67]},{10:55,21:$Vl,23:68,24:$Vm,35:$Vn,69:$Vo,70:$Vp,71:$Vq,72:$Vr,73:$Vs,74:$Vt,75:$Vu},{10:55,21:$Vl,23:69,24:$Vm,35:$Vn,69:$Vo,70:$Vp,71:$Vq,72:$Vr,73:$Vs,74:$Vt,75:$Vu},{10:55,21:$Vl,23:70,24:$Vm,35:$Vn,69:$Vo,70:$Vp,71:$Vq,72:$Vr,73:$Vs,74:$Vt,75:$Vu},{7:71,9:72,20:13,21:$Vv,30:$V1,53:$V8,54:$V9,55:$Va,56:$Vb,57:$Vc},{47:[1,74]},{4:75,6:3,7:4,9:5,10:6,11:7,12:8,13:9,14:10,15:11,16:12,19:[1,76],20:13,21:$V0,30:$V1,36:$V2,39:$V3,47:$V4,48:$V5,49:$V6,50:$V7,53:$V8,54:$V9,55:$Va,56:$Vb,57:$Vc},{10:55,21:$Vl,23:77,24:$Vm,35:$Vn,69:$Vo,70:$Vp,71:$Vq,72:$Vr,73:$Vs,74:$Vt,75:$Vu},{10:55,21:$Vl,23:78,24:[1,79],35:$Vn,69:$Vo,70:$Vp,71:$Vq,72:$Vr,73:$Vs,74:$Vt,75:$Vu},{21:[1,80]},{32:[1,81]},o($Vw,[2,23],{31:$Vx,32:$Vy,34:$Vz,35:$VA,58:$VB,59:$VC,60:$VD,61:$VE,62:$VF,63:$VG,64:$VH,65:$VI,66:$VJ,67:$VK,68:$VL}),{10:55,21:$Vl,23:97,24:$Vm,35:$Vn,69:$Vo,70:$Vp,71:$Vq,72:$Vr,73:$Vs,74:$Vt,75:$Vu},{10:55,21:$Vl,23:98,24:$Vm,35:$Vn,69:$Vo,70:$Vp,71:$Vq,72:$Vr,73:$Vs,74:$Vt,75:$Vu},{10:55,21:$Vl,23:99,24:$Vm,35:$Vn,69:$Vo,70:$Vp,71:$Vq,72:$Vr,73:$Vs,74:$Vt,75:$Vu},o($VM,[2,70]),o($VM,[2,71],{26:[1,100],51:$Vi}),o($VM,[2,72]),o($VM,[2,73]),o($VM,[2,74]),o($VM,[2,75]),o($VM,[2,76]),o($VM,[2,77]),{27:[1,101],31:$Vx,32:$Vy,34:$Vz,35:$VA,58:$VB,59:$VC,60:$VD,61:$VE,62:$VF,63:$VG,64:$VH,65:$VI,66:$VJ,67:$VK,68:$VL},{10:55,21:$Vl,23:102,24:$Vm,35:$Vn,69:$Vo,70:$Vp,71:$Vq,72:$Vr,73:$Vs,74:$Vt,75:$Vu},o($Vw,[2,26]),o($Vw,[2,27]),{24:[1,103]},{25:[1,104],31:$Vx,32:$Vy,34:$Vz,35:$VA,58:$VB,59:$VC,60:$VD,61:$VE,62:$VF,63:$VG,64:$VH,65:$VI,66:$VJ,67:$VK,68:$VL},{25:[1,105],31:$Vx,32:$Vy,34:$Vz,35:$VA,58:$VB,59:$VC,60:$VD,61:$VE,62:$VF,63:$VG,64:$VH,65:$VI,66:$VJ,67:$VK,68:$VL},{25:[1,106],31:$Vx,32:$Vy,34:$Vz,35:$VA,58:$VB,59:$VC,60:$VD,61:$VE,62:$VF,63:$VG,64:$VH,65:$VI,66:$VJ,67:$VK,68:$VL},{8:[1,107]},{8:[1,108]},{22:$Vf,26:[1,109],34:$Vg,35:$Vh},{24:[1,110]},{6:28,7:4,9:5,10:6,11:7,12:8,13:9,14:10,15:11,16:12,19:[1,111],20:13,21:$V0,30:$V1,36:$V2,39:$V3,47:$V4,48:$V5,49:$V6,50:$V7,53:$V8,54:$V9,55:$Va,56:$Vb,57:$Vc},o($VN,[2,14]),{25:[1,112],31:$Vx,32:$Vy,34:$Vz,35:$VA,58:$VB,59:$VC,60:$VD,61:$VE,62:$VF,63:$VG,64:$VH,65:$VI,66:$VJ,67:$VK,68:$VL},{8:[2,15],31:$Vx,32:$Vy,34:$Vz,35:$VA,58:$VB,59:$VC,60:$VD,61:$VE,62:$VF,63:$VG,64:$VH,65:$VI,66:$VJ,67:$VK,68:$VL},{10:55,20:113,21:$Vl,23:98,24:$Vm,35:$Vn,53:$V8,54:$V9,55:$Va,56:$Vb,57:$Vc,69:$Vo,70:$Vp,71:$Vq,72:$Vr,73:$Vs,74:$Vt,75:$Vu},{22:[1,114]},{21:[1,115]},{10:55,21:$Vl,23:116,24:$Vm,35:$Vn,69:$Vo,70:$Vp,71:$Vq,72:$Vr,73:$Vs,74:$Vt,75:$Vu},{10:55,21:$Vl,23:117,24:$Vm,35:$Vn,69:$Vo,70:$Vp,71:$Vq,72:$Vr,73:$Vs,74:$Vt,75:$Vu},{10:55,21:$Vl,23:118,24:$Vm,35:$Vn,69:$Vo,70:$Vp,71:$Vq,72:$Vr,73:$Vs,74:$Vt,75:$Vu},{10:55,21:$Vl,23:119,24:$Vm,35:$Vn,69:$Vo,70:$Vp,71:$Vq,72:$Vr,73:$Vs,74:$Vt,75:$Vu},{10:55,21:$Vl,23:120,24:$Vm,35:$Vn,69:$Vo,70:$Vp,71:$Vq,72:$Vr,73:$Vs,74:$Vt,75:$Vu},{10:55,21:$Vl,23:121,24:$Vm,35:$Vn,69:$Vo,70:$Vp,71:$Vq,72:$Vr,73:$Vs,74:$Vt,75:$Vu},{10:55,21:$Vl,23:122,24:$Vm,35:$Vn,69:$Vo,70:$Vp,71:$Vq,72:$Vr,73:$Vs,74:$Vt,75:$Vu},{10:55,21:$Vl,23:123,24:$Vm,35:$Vn,69:$Vo,70:$Vp,71:$Vq,72:$Vr,73:$Vs,74:$Vt,75:$Vu},{10:55,21:$Vl,23:124,24:$Vm,35:$Vn,69:$Vo,70:$Vp,71:$Vq,72:$Vr,73:$Vs,74:$Vt,75:$Vu},{10:55,21:$Vl,23:125,24:$Vm,35:$Vn,69:$Vo,70:$Vp,71:$Vq,72:$Vr,73:$Vs,74:$Vt,75:$Vu},{10:55,21:$Vl,23:126,24:$Vm,35:$Vn,69:$Vo,70:$Vp,71:$Vq,72:$Vr,73:$Vs,74:$Vt,75:$Vu},{10:55,21:$Vl,23:127,24:$Vm,35:$Vn,69:$Vo,70:$Vp,71:$Vq,72:$Vr,73:$Vs,74:$Vt,75:$Vu},{10:55,21:$Vl,23:128,24:$Vm,35:$Vn,69:$Vo,70:$Vp,71:$Vq,72:$Vr,73:$Vs,74:$Vt,75:$Vu},{10:55,21:$Vl,23:129,24:$Vm,35:$Vn,69:$Vo,70:$Vp,71:$Vq,72:$Vr,73:$Vs,74:$Vt,75:$Vu},{10:55,21:$Vl,23:130,24:$Vm,35:$Vn,69:$Vo,70:$Vp,71:$Vq,72:$Vr,73:$Vs,74:$Vt,75:$Vu},o($VO,[2,58],{34:$Vz,35:$VA,58:$VB,59:$VC,60:$VD,61:$VE,68:$VL}),{25:[1,131],31:$Vx,32:$Vy,34:$Vz,35:$VA,58:$VB,59:$VC,60:$VD,61:$VE,62:$VF,63:$VG,64:$VH,65:$VI,66:$VJ,67:$VK,68:$VL},o($VO,[2,69],{34:$Vz,35:$VA,58:$VB,59:$VC,60:$VD,61:$VE,68:$VL}),{10:55,21:$Vl,23:132,24:$Vm,26:[1,133],35:$Vn,69:$Vo,70:$Vp,71:$Vq,72:$Vr,73:$Vs,74:$Vt,75:$Vu},{8:$VP,22:$VQ},{27:[1,135],31:$Vx,32:$Vy,34:$Vz,35:$VA,58:$VB,59:$VC,60:$VD,61:$VE,62:$VF,63:$VG,64:$VH,65:$VI,66:$VJ,67:$VK,68:$VL},{10:55,21:$Vl,23:136,24:$Vm,35:$Vn,69:$Vo,70:$Vp,71:$Vq,72:$Vr,73:$Vs,74:$Vt,75:$Vu},{17:137,18:$Vj},{18:[1,138]},{17:139,18:$Vj},{10:55,21:$Vl,23:140,24:$Vm,35:$Vn,69:$Vo,70:$Vp,71:$Vq,72:$Vr,73:$Vs,74:$Vt,75:$Vu},{10:55,21:$Vl,23:141,24:$Vm,35:$Vn,69:$Vo,70:$Vp,71:$Vq,72:$Vr,73:$Vs,74:$Vt,75:$Vu},{10:55,21:$Vl,23:142,24:$Vm,26:[1,143],35:$Vn,69:$Vo,70:$Vp,71:$Vq,72:$Vr,73:$Vs,74:$Vt,75:$Vu},{10:55,21:$Vl,23:144,24:$Vm,35:$Vn,69:$Vo,70:$Vp,71:$Vq,72:$Vr,73:$Vs,74:$Vt,75:$Vu},o($VN,[2,13]),{8:[2,43]},{25:[1,145]},{18:[1,147],28:[1,146]},{22:[1,148]},o($VR,[2,52],{68:$VL}),o($VR,[2,53],{68:$VL}),o($VS,[2,54],{34:$Vz,35:$VA,68:$VL}),o($VS,[2,55],{34:$Vz,35:$VA,68:$VL}),o($VO,[2,56],{34:$Vz,35:$VA,58:$VB,59:$VC,61:$VE,68:$VL}),o($VS,[2,57],{34:$Vz,35:$VA,68:$VL}),o($VT,[2,60],{31:$Vx,32:$Vy,34:$Vz,35:$VA,58:$VB,59:$VC,60:$VD,61:$VE,64:$VH,65:$VI,68:$VL}),o($VT,[2,61],{31:$Vx,32:$Vy,34:$Vz,35:$VA,58:$VB,59:$VC,60:$VD,61:$VE,64:$VH,65:$VI,68:$VL}),o($VO,[2,62],{34:$Vz,35:$VA,58:$VB,59:$VC,60:$VD,61:$VE,68:$VL}),o($VO,[2,63],{34:$Vz,35:$VA,58:$VB,59:$VC,60:$VD,61:$VE,68:$VL}),o($VO,[2,64],{34:$Vz,35:$VA,58:$VB,59:$VC,60:$VD,61:$VE,68:$VL}),o($VO,[2,65],{34:$Vz,35:$VA,58:$VB,59:$VC,60:$VD,61:$VE,68:$VL}),o([8,19,25,27,33,42,66],[2,66],{31:$Vx,32:$Vy,34:$Vz,35:$VA,58:$VB,59:$VC,60:$VD,61:$VE,62:$VF,63:$VG,64:$VH,65:$VI,67:$VK,68:$VL}),o([8,19,25,27,33,42,66,67],[2,67],{31:$Vx,32:$Vy,34:$Vz,35:$VA,58:$VB,59:$VC,60:$VD,61:$VE,62:$VF,63:$VG,64:$VH,65:$VI,68:$VL}),{31:$Vx,32:$Vy,34:$Vz,35:$VA,42:[1,149],58:$VB,59:$VC,60:$VD,61:$VE,62:$VF,63:$VG,64:$VH,65:$VI,66:$VJ,67:$VK,68:$VL},o($VM,[2,59]),{27:[1,150],31:$Vx,32:$Vy,34:$Vz,35:$VA,58:$VB,59:$VC,60:$VD,61:$VE,62:$VF,63:$VG,64:$VH,65:$VI,66:$VJ,67:$VK,68:$VL},{10:55,21:$Vl,23:151,24:$Vm,35:$Vn,69:$Vo,70:$Vp,71:$Vq,72:$Vr,73:$Vs,74:$Vt,75:$Vu},{10:55,21:$Vl,23:152,24:$Vm,35:$Vn,69:$Vo,70:$Vp,71:$Vq,72:$Vr,73:$Vs,74:$Vt,75:$Vu},{27:[1,153]},{25:[1,154],31:$Vx,32:$Vy,34:$Vz,35:$VA,58:$VB,59:$VC,60:$VD,61:$VE,62:$VF,63:$VG,64:$VH,65:$VI,66:$VJ,67:$VK,68:$VL},o($Ve,[2,28],{37:155,38:[1,156]}),{40:157,44:[1,158]},o($Ve,[2,39]),{8:[1,159],31:$Vx,32:$Vy,34:$Vz,35:$VA,58:$VB,59:$VC,60:$VD,61:$VE,62:$VF,63:$VG,64:$VH,65:$VI,66:$VJ,67:$VK,68:$VL},{8:[1,160],31:$Vx,32:$Vy,34:$Vz,35:$VA,58:$VB,59:$VC,60:$VD,61:$VE,62:$VF,63:$VG,64:$VH,65:$VI,66:$VJ,67:$VK,68:$VL},{27:[1,161],31:$Vx,32:$Vy,34:$Vz,35:$VA,58:$VB,59:$VC,60:$VD,61:$VE,62:$VF,63:$VG,64:$VH,65:$VI,66:$VJ,67:$VK,68:$VL},{10:55,21:$Vl,23:162,24:$Vm,35:$Vn,69:$Vo,70:$Vp,71:$Vq,72:$Vr,73:$Vs,74:$Vt,75:$Vu},{25:[1,163],31:$Vx,32:$Vy,34:$Vz,35:$VA,58:$VB,59:$VC,60:$VD,61:$VE,62:$VF,63:$VG,64:$VH,65:$VI,66:$VJ,67:$VK,68:$VL},{10:55,21:$Vl,23:164,24:$Vm,35:$Vn,69:$Vo,70:$Vp,71:$Vq,72:$Vr,73:$Vs,74:$Vt,75:$Vu},{20:165,53:$V8,54:$V9,55:$Va,56:$Vb,57:$Vc},{10:55,21:$Vl,23:167,24:$Vm,29:166,35:$Vn,69:$Vo,70:$Vp,71:$Vq,72:$Vr,73:$Vs,74:$Vt,75:$Vu},{28:[1,168]},{10:55,21:$Vl,23:169,24:$Vm,35:$Vn,69:$Vo,70:$Vp,71:$Vq,72:$Vr,73:$Vs,74:$Vt,75:$Vu},o($VM,$VP),{27:[1,170],31:$Vx,32:$Vy,34:$Vz,35:$VA,58:$VB,59:$VC,60:$VD,61:$VE,62:$VF,63:$VG,64:$VH,65:$VI,66:$VJ,67:$VK,68:$VL},o($Vw,[2,24],{31:$Vx,32:$Vy,34:$Vz,35:$VA,58:$VB,59:$VC,60:$VD,61:$VE,62:$VF,63:$VG,64:$VH,65:$VI,66:$VJ,67:$VK,68:$VL}),{8:$VU,22:$VV},o($VM,[2,46]),o($Ve,[2,29]),{11:172,17:173,18:$Vj,36:$V2},{41:[1,174],44:[1,175]},{10:55,21:$Vl,23:176,24:$Vm,35:$Vn,69:$Vo,70:$Vp,71:$Vq,72:$Vr,73:$Vs,74:$Vt,75:$Vu},{9:177,21:$Vv},{9:178,21:$Vv},{22:$VQ},{27:[1,179],31:$Vx,32:$Vy,34:$Vz,35:$VA,58:$VB,59:$VC,60:$VD,61:$VE,62:$VF,63:$VG,64:$VH,65:$VI,66:$VJ,67:$VK,68:$VL},{8:[1,180]},{8:[2,17],31:$Vx,32:$Vy,34:$Vz,35:$VA,58:$VB,59:$VC,60:$VD,61:$VE,62:$VF,63:$VG,64:$VH,65:$VI,66:$VJ,67:$VK,68:$VL},{26:[1,181]},{19:[1,182],33:[1,183]},o($VW,[2,22],{31:$Vx,32:$Vy,34:$Vz,35:$VA,58:$VB,59:$VC,60:$VD,61:$VE,62:$VF,63:$VG,64:$VH,65:$VI,66:$VJ,67:$VK,68:$VL}),{30:[1,184]},o($VM,[2,68]),{27:[1,185]},{10:55,21:$Vl,23:186,24:$Vm,35:$Vn,69:$Vo,70:$Vp,71:$Vq,72:$Vr,73:$Vs,74:$Vt,75:$Vu},o($Ve,[2,30]),o($Ve,[2,31]),{42:[1,187]},{10:55,21:$Vl,23:188,24:$Vm,35:$Vn,69:$Vo,70:$Vp,71:$Vq,72:$Vr,73:$Vs,74:$Vt,75:$Vu},{31:$Vx,32:$Vy,34:$Vz,35:$VA,42:[1,189],58:$VB,59:$VC,60:$VD,61:$VE,62:$VF,63:$VG,64:$VH,65:$VI,66:$VJ,67:$VK,68:$VL},{25:[1,190]},{25:[1,191]},{27:[1,192]},o($Ve,[2,42]),{10:55,21:$Vl,23:193,24:$Vm,35:$Vn,69:$Vo,70:$Vp,71:$Vq,72:$Vr,73:$Vs,74:$Vt,75:$Vu},{8:[2,19]},{10:55,21:$Vl,23:194,24:$Vm,35:$Vn,69:$Vo,70:$Vp,71:$Vq,72:$Vr,73:$Vs,74:$Vt,75:$Vu},{31:[1,195]},o($VM,$VU),o($Vw,[2,25],{31:$Vx,32:$Vy,34:$Vz,35:$VA,58:$VB,59:$VC,60:$VD,61:$VE,62:$VF,63:$VG,64:$VH,65:$VI,66:$VJ,67:$VK,68:$VL}),{6:199,7:4,9:5,10:6,11:7,12:8,13:9,14:10,15:11,16:12,20:13,21:$V0,30:$V1,36:$V2,39:$V3,43:196,45:197,46:$VX,47:$V4,48:$V5,49:$V6,50:$V7,53:$V8,54:$V9,55:$Va,56:$Vb,57:$Vc},{31:$Vx,32:$Vy,34:$Vz,35:$VA,42:[1,200],58:$VB,59:$VC,60:$VD,61:$VE,62:$VF,63:$VG,64:$VH,65:$VI,66:$VJ,67:$VK,68:$VL},{6:199,7:4,9:5,10:6,11:7,12:8,13:9,14:10,15:11,16:12,20:13,21:$V0,30:$V1,36:$V2,39:$V3,43:201,45:197,46:$VX,47:$V4,48:$V5,49:$V6,50:$V7,53:$V8,54:$V9,55:$Va,56:$Vb,57:$Vc},{17:202,18:$Vj},{17:203,18:$Vj},{22:$VV},{27:[1,204],31:$Vx,32:$Vy,34:$Vz,35:$VA,58:$VB,59:$VC,60:$VD,61:$VE,62:$VF,63:$VG,64:$VH,65:$VI,66:$VJ,67:$VK,68:$VL},o($VW,[2,21],{31:$Vx,32:$Vy,34:$Vz,35:$VA,58:$VB,59:$VC,60:$VD,61:$VE,62:$VF,63:$VG,64:$VH,65:$VI,66:$VJ,67:$VK,68:$VL}),{20:205,53:$V8,54:$V9,55:$Va,56:$Vb,57:$Vc},{6:199,7:4,9:5,10:6,11:7,12:8,13:9,14:10,15:11,16:12,19:[1,206],20:13,21:$V0,30:$V1,36:$V2,39:$V3,45:207,46:$VX,47:$V4,48:$V5,49:$V6,50:$V7,53:$V8,54:$V9,55:$Va,56:$Vb,57:$Vc},o($VY,[2,36]),{8:[1,208]},o($VY,[2,38]),{6:199,7:4,9:5,10:6,11:7,12:8,13:9,14:10,15:11,16:12,20:13,21:$V0,30:$V1,36:$V2,39:$V3,43:209,45:197,46:$VX,47:$V4,48:$V5,49:$V6,50:$V7,53:$V8,54:$V9,55:$Va,56:$Vb,57:$Vc},o($VZ,[2,34],{7:4,9:5,10:6,11:7,12:8,13:9,14:10,15:11,16:12,20:13,6:199,45:207,21:$V0,30:$V1,36:$V2,39:$V3,46:$VX,47:$V4,48:$V5,49:$V6,50:$V7,53:$V8,54:$V9,55:$Va,56:$Vb,57:$Vc}),o($Ve,[2,40]),o($Ve,[2,41]),{8:[2,18]},{32:[1,210]},o($Ve,[2,32]),o($VY,[2,35]),o($VY,[2,37]),o($VZ,[2,33],{7:4,9:5,10:6,11:7,12:8,13:9,14:10,15:11,16:12,20:13,6:199,45:207,21:$V0,30:$V1,36:$V2,39:$V3,46:$VX,47:$V4,48:$V5,49:$V6,50:$V7,53:$V8,54:$V9,55:$Va,56:$Vb,57:$Vc}),{8:[2,20]}];
    defaultActions: {[key:number]: any} = {27:[2,1],112:[2,43],182:[2,19],204:[2,18],210:[2,20]};

    performAction (yytext:string, yyleng:number, yylineno:number, yy:any, yystate:number /* action[1] */, $$:any /* vstack */, _$:any /* lstack */): any {
/* this == yyval */
          var $0 = $$.length - 1;
        switch (yystate) {
case 1:

      console.log("Parse de Jison entrada: OK ");
      let raiz = $$[$0-1]
      this.$ = raiz;
      console.log(this.$)
      return raiz;
    
break;
case 2:

            $$[$0-1].push($$[$0]);
            this.$ = $$[$0-1];
          
break;
case 3:

            let arr = [];
            arr.push($$[$0]);
            this.$ = arr;
          
break;
case 4: case 5: case 6: case 12: case 59:
 this.$ = $$[$0-1]; 
break;
case 7: case 8: case 9: case 10: case 11: case 70:
 this.$ = $$[$0]; 
break;
case 13:

                  this.$ = $$[$0-1];
                
break;
case 14:

                  this.$ = [];
                
break;
case 15:

              this.$ = new VariableDeclaration($$[$0-3], $$[$0-2], $$[$0], _$[$0-2].first_line, _$[$0-2].first_column);
            
break;
case 16:

              this.$ = {
                type: 'declaration',
                value: $$[$0-1],
                id: $$[$0]
              }
            
break;
case 17:

              this.$ = {
                type: 'declaration with cast',
                type_: $$[$0-6],
                id: $$[$0-5],
                type_cast: $$[$0-2],
                exp: $$[$0]
              }
            
break;
case 18:

              this.$ = {
                type: 'declaration vector 1',
                type_: $$[$0-9],
                id: $$[$0-6],
                exp: $$[$0-1],
              }
            
break;
case 19:

              this.$ = {
                type: 'declaration vector 2',
                id: $$[$0-4],
                exps: $$[$0-1]
              }
            
break;
case 20:

              this.$ = {
                type: 'declaration list ',
                type_: $$[$0-8],
                id: $$[$0-6],
              }
            
break;
case 21:

            $$[$0-2].push($$[$0]);
            this.$ = $$[$0-2];
           
break;
case 22:

            let arrlistEXP = [];
            arrlistEXP.push($$[$0]);
            this.$ = arrlistEXP;
           
break;
case 23:

              this.$ = {
                type: 'assignment',
                id: $$[$0-2],
                exp: $$[$0]
              }
            
break;
case 24:

            this.$ = {
              type: 'assignment vector',
              id: $$[$0-5],
              exp: $$[$0-3],
              exp2: $$[$0]
            }
           
break;
case 25:

            this.$ = {
              type: 'assignment list',
              id: $$[$0-7],
              exp: $$[$0-4],
              exp2: $$[$0]
            }
           
break;
case 26:

            this.$ = {
              type: 'increment',
              id: $$[$0-2]
            }
           
break;
case 27:

            this.$ = {
              type: 'decrement',
              id: $$[$0-2]
            }
           
break;
case 28:

            this.$ = {
              type: 'if',
              exp: $$[$0-2],
              sentences: $$[$0]
            }
           
break;
case 29:

            this.$ = {
              type: 'if else',
              exp: $$[$0-3],
              sentences: $$[$0-1],
              sentences_else: $$[$0]
            }
           
break;
case 30:

            let else_sentence = [];
            else_sentence.push($$[$0]);
            this.$ = else_sentence;
          
break;
case 31:

            this.$ = $$[$0];
          
break;
case 32:

              this.$ = {
                type: 'switch',
                exp: $$[$0-7],
                cases: $$[$0-4],
                statements: $$[$0-1]
              }
            
break;
case 33:

            $$[$0-4].push({
              exp: $$[$0-2],
              statements: $$[$0]
            });
            this.$ = $$[$0-4];
           
break;
case 34:

            let arrcases = [];
            arrcases.push({
              exp: $$[$0-2],
              statements: $$[$0]
            });
            this.$ = arrcases;
           
break;
case 35:

              $$[$0-1].push($$[$0]);
              this.$ = $$[$0-1];
            
break;
case 36:

              let arrstatements = [];
              arrstatements.push($$[$0]);
              this.$ = arrstatements;
            
break;
case 37:

              this.$ = {
                type: 'break'
              }
            
break;
case 38:

              this.$ = $$[$0];
            
break;
case 39:

              this.$ = {
                type: 'while',
                exp: $$[$0-2],
                sentences: $$[$0]
              }
            
break;
case 40:

              this.$ = {
                type: 'for',
                declaration: $$[$0-6],
                exp: $$[$0-4],
                update: $$[$0-2],
                sentences: $$[$0]
              }
            
break;
case 41:

              this.$ = {
                type: 'for',
                assigment: $$[$0-6],
                exp: $$[$0-4],
                update: $$[$0-2],
                sentences: $$[$0]
              }
            
break;
case 42:

              this.$ = {
                type: 'do while',
                sentences: $$[$0-5],
                exp: $$[$0-2]
              }
            
break;
case 43:

            this.$ = {
              type: 'print',
              exp: $$[$0-1]
            }
           
break;
case 44:

            this.$ = {
              type: 'access vector',
              id: $$[$0-3],
              exp: $$[$0-1]
            }
          
break;
case 45:

            this.$ = {
              type: 'access list',
              id: $$[$0-5],
              exp: $$[$0-2]
            }
          
break;
case 46:

            this.$ = {
              type: 'add list',
              id: $$[$0-5],
              exp: $$[$0-1]
            }
          
break;
case 47: case 48: case 49: case 50: case 51: case 71: case 72: case 73: case 74: case 75: case 76: case 77:
 this.$ = $$[$0];
break;
case 52:
 this.$ = {type: 'add', left: $$[$0-2], right: $$[$0]}; 
break;
case 53:
 this.$ = {type: 'sub', left: $$[$0-2], right: $$[$0]}; 
break;
case 54:
 this.$ = {type: 'mul', left: $$[$0-2], right: $$[$0]}; 
break;
case 55:
 this.$ = {type: 'div', left: $$[$0-2], right: $$[$0]}; 
break;
case 56:
 this.$ = {type: 'pow', left: $$[$0-2], right: $$[$0]}; 
break;
case 57:
 this.$ = {type: 'mod', left: $$[$0-2], right: $$[$0]}; 
break;
case 58:
 this.$ = {type: 'negative', value: $$[$0]}; 
break;
case 60:
 this.$ = {type: 'eq', left: $$[$0-2], right: $$[$0]}; 
break;
case 61:
 this.$ = {type: 'neq', left: $$[$0-2], right: $$[$0]}; 
break;
case 62:
 this.$ = {type: 'lte', left: $$[$0-2], right: $$[$0]}; 
break;
case 63:
 this.$ = {type: 'gte', left: $$[$0-2], right: $$[$0]}; 
break;
case 64:
 this.$ = {type: 'lt', left: $$[$0-2], right: $$[$0]}; 
break;
case 65:
 this.$ = {type: 'gt', left: $$[$0-2], right: $$[$0]}; 
break;
case 66:
 this.$ = {type: 'and', left: $$[$0-2], right: $$[$0]}; 
break;
case 67:
 this.$ = {type: 'or', left: $$[$0-2], right: $$[$0]}; 
break;
case 68:
 this.$ = {type: 'ternary', left: $$[$0-4], middle: $$[$0-2], right: $$[$0]}; 
break;
case 69:
 this.$ = {type: 'not', exp: $$[$0]}; 
break;
        }
    }
}


/* generated by ts-jison-lex 0.3.0 */
import { JisonLexer, JisonLexerApi } from '@ts-jison/lexer';
export class ParserLexer extends JisonLexer implements JisonLexerApi {
    options: any = {"case-insensitive":true,"moduleName":"Parser"};
    constructor (yy = {}) {
        super(yy);
    }

    rules: RegExp[] = [/^(?:\s+)/i,/^(?:(\/\/).*)/i,/^(?:[ \r\t])/i,/^(?:\n)/i,/^(?:[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/])/i,/^(?:int\b)/i,/^(?:double\b)/i,/^(?:boolean\b)/i,/^(?:char\b)/i,/^(?:string\b)/i,/^(?:true\b)/i,/^(?:false\b)/i,/^(?:new\b)/i,/^(?:list\b)/i,/^(?:add\b)/i,/^(?:if\b)/i,/^(?:else\b)/i,/^(?:switch\b)/i,/^(?:case\b)/i,/^(?:default\b)/i,/^(?:while\b)/i,/^(?:for\b)/i,/^(?:do\b)/i,/^(?:break\b)/i,/^(?:continue\b)/i,/^(?:return\b)/i,/^(?:print\b)/i,/^(?:toLower\b)/i,/^(?:toUpper\b)/i,/^(?:length\b)/i,/^(?:truncate\b)/i,/^(?:round\b)/i,/^(?:typeOf\b)/i,/^(?:toString\b)/i,/^(?:toCharArray\b)/i,/^(?:main\b)/i,/^(?:void\b)/i,/^(?:\+)/i,/^(?:-)/i,/^(?:\*)/i,/^(?:\/)/i,/^(?:\^)/i,/^(?:%)/i,/^(?:<=)/i,/^(?:>=)/i,/^(?:==)/i,/^(?:!=)/i,/^(?:<)/i,/^(?:>)/i,/^(?:\?)/i,/^(?::)/i,/^(?:\|\|)/i,/^(?:&&)/i,/^(?:!)/i,/^(?:\()/i,/^(?:\))/i,/^(?:=)/i,/^(?:\+\+)/i,/^(?:--)/i,/^(?:\$)/i,/^(?:;)/i,/^(?:,)/i,/^(?:\.)/i,/^(?:\{)/i,/^(?:\})/i,/^(?:\[)/i,/^(?:\])/i,/^(?:([a-zA-ZÑñ]|(_[a-zA-ZÑñ]))([a-zA-ZÑñ]|[0-9]|_)*)/i,/^(?:'(?:(\\)["bfnrt/(\\)]|(\\)u[a-fA-F0-9]{4}|[^"(\\)])')/i,/^(?:((?:[0-9]|[1-9][0-9]+))((?:\.[0-9]+))\b)/i,/^(?:((?:[0-9]|[1-9][0-9]+))\b)/i,/^(?:"(?:[{cor1}|{cor2}]|["\\"]["bnrt/["\\"]|[^"["\\"])*")/i,/^(?:$)/i,/^(?:.)/i];
    conditions: any = {"INITIAL":{"rules":[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73],"inclusive":true}}
    performAction (yy:any,yy_:any,$avoiding_name_collisions:any,YY_START:any): any {
          var YYSTATE=YY_START;
        switch($avoiding_name_collisions) {
    case 0:/* skip whitespace */
      break;
    case 1:/* line comment */
      break;
    case 2:/* white space */
      break;
    case 3:/* white space */
      break;
    case 4:/* multi comment */
      break;
    case 5: return 53; 
      break;
    case 6: return 54; 
      break;
    case 7: return 55; 
      break;
    case 8: return 56; 
      break;
    case 9: return 57; 
      break;
    case 10: return 73; 
      break;
    case 11: return 74; 
      break;
    case 12: return 28; 
      break;
    case 13: return 30; 
      break;
    case 14: return 52; 
      break;
    case 15: return 36; 
      break;
    case 16: return 38; 
      break;
    case 17: return 39; 
      break;
    case 18: return 44; 
      break;
    case 19: return 41; 
      break;
    case 20: return 47; 
      break;
    case 21: return 48; 
      break;
    case 22: return 49; 
      break;
    case 23: return 46; 
      break;
    case 24: return 't_continue'; 
      break;
    case 25: return 't_return'; 
      break;
    case 26: return 50; 
      break;
    case 27: return 't_toLower'; 
      break;
    case 28: return 't_toUpper'; 
      break;
    case 29: return 't_length'; 
      break;
    case 30: return 't_truncate'; 
      break;
    case 31: return 't_round'; 
      break;
    case 32: return 't_typeOf'; 
      break;
    case 33: return 't_toString'; 
      break;
    case 34: return 't_toCharArray'; 
      break;
    case 35: return 't_main'; 
      break;
    case 36: return 't_void'; 
      break;
    case 37:return 34;
      break;
    case 38:return 35;
      break;
    case 39:return 58;
      break;
    case 40:return 59;
      break;
    case 41:return 60;
      break;
    case 42:return 61;
      break;
    case 43:return 64;
      break;
    case 44:return 65;
      break;
    case 45:return 62;
      break;
    case 46:return 63;
      break;
    case 47:return 31;
      break;
    case 48:return 32;
      break;
    case 49:return 68;
      break;
    case 50:return 42;
      break;
    case 51:return 67;
      break;
    case 52:return 66;
      break;
    case 53:return 69;
      break;
    case 54:return 24;
      break;
    case 55:return 25;
      break;
    case 56:return 22;
      break;
    case 57:return '++';
      break;
    case 58:return '--';
      break;
    case 59:return '$';
      break;
    case 60:return 8;
      break;
    case 61:return 33;
      break;
    case 62:return 51;
      break;
    case 63:return 18;
      break;
    case 64:return 19;
      break;
    case 65:return 26;
      break;
    case 66:return 27;
      break;
    case 67:yy_.yytext = yy_.yytext.toLowerCase();          return 21;
      break;
    case 68:yy_.yytext = yy_.yytext.substr(1,yy_.yyleng-2);     return 75// substr to remove the quotes
      break;
    case 69:return 71
      break;
    case 70:return 70
      break;
    case 71:yy_.yytext = yy_.yytext.substr(1,yy_.yyleng-2);     return 72;
      break;
    case 72: return 5; 
      break;
    case 73:console.error('Este es un error léxico: ' + yy_.yytext + ', en la linea: ' + yy_.yylloc.first_line + ', en la columna: ' + yy_.yylloc.first_column);
      break;
        }
    }
}

