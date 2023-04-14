FileText = `#ifndef __VZ32_OPCODE__
#define __VZ32_OPCODE__

#define OPC_ALU 0x0
#define OPC_MUL 0x2
#define OPC_LOGIC 0x4
    #define OPC_IMM 0x1

#define OPC_MEM 0x6
    #define OPC_MEM_ST 0x1

#define OPC_BRANCH 0x8
    #define OPC_BR_REG 0x1
    #define OPC_BR_INT 0x2
    #define OPC_BR_FP_S 0x4
    #define OPC_BR_FP_D 0x6
        #define OPC_BR_EQ 0x0
        #define OPC_BR_CD 0x1

#define OPC_FP_S 0x10
#define OPC_FP_D 0x11
    #define OPC_FALU 0x0
    #define OPC_FMUL 0x2
    #define OPC_FSQRT 0x4
#define OPC_I2F 0x16
#define OPC_F2I 0x17

#define OPC_SYSTEM 0x18

struct vz32_opcode{
    const char* name;
    const char type;
    const char B_opc;
    const char B_func;
};

enum optype{
    B = 0,
    BR,
    I = 2,
    M = 2,
    R
};

const short vz32_opcode_count = 68;

const struct vz32_opcode vz32_list_opcodes[] = {
    {"ADD", R, OPC_ALU, 0},
    {"SUB", R, OPC_ALU, 1},
    {"ADD-IMM", I, OPC_ALU | OPC_IMM, 0},
    {"SUB-IMM", I, OPC_ALU | OPC_IMM, 1},

    {"MUL", R, OPC_MUL, 0},
    {"DIV", R, OPC_MUL, 1},
    {"MUL-IMM", I, OPC_MUL | OPC_IMM, 0},
    {"DIV-IMM", I, OPC_MUL | OPC_IMM, 1},
    {"SHIFT-L", I, OPC_MUL | OPC_IMM, 2},
    {"SHIFT-R", I, OPC_MUL | OPC_IMM, 3},

    {"AND", R, OPC_LOGIC, 0},
    {"OR", R, OPC_LOGIC, 1},
    {"XOR", R, OPC_LOGIC, 2},
    {"NOT", R, OPC_LOGIC, 3},
    {"AND-IMM", I, OPC_LOGIC | OPC_IMM, 0},
    {"OR-IMM", I, OPC_LOGIC | OPC_IMM, 1},
    {"XOR-IMM", I, OPC_LOGIC | OPC_IMM, 2},
    {"NOT-IMM", I, OPC_LOGIC | OPC_IMM, 3},

    {"LOAD-INT-SIGNED", M, OPC_MEM, 0},
    {"LOAD-INT-UNSIGNED", M, OPC_MEM, 1},
    {"LOAD-FP", M, OPC_MEM, 2},
    {"POP", M, OPC_MEM, 3}, 
    {"STORE-INT-SIGNED", M, OPC_MEM | OPC_MEM_ST, 0},
    {"STORE-INT-UNSIGNED", M, OPC_MEM | OPC_MEM_ST, 1},
    {"STORE-FP", M, OPC_MEM | OPC_MEM_ST, 2},
    {"PUSH", M, OPC_MEM | OPC_MEM_ST, 3},

    {"BRANCH-DIRECT", B, OPC_BRANCH, 0},
    {"BRANCH-SUBROUTINE", B, OPC_BRANCH, 1},
    {"RETURN", B, OPC_BRANCH, 2},
    {"BRANCH-DIRECT", I, OPC_BRANCH | OPC_BR_REG, 0},
    {"BRANCH-SUBROUTINE", I, OPC_BRANCH | OPC_BR_REG, 1},
    {"BRANCH-INT-EQUAL", R, OPC_BRANCH | OPC_BR_INT | OPC_BR_EQ, 0},
    {"BRANCH-INT-NOTEQUAL", R, OPC_BRANCH | OPC_BR_INT | OPC_BR_EQ, 1},
    {"BRANCH-INT-LEFTEQCD", R, OPC_BRANCH | OPC_BR_INT | OPC_BR_CD, 0},
    {"BRANCH-INT-LEFTCD", R, OPC_BRANCH | OPC_BR_INT | OPC_BR_CD, 1},
    {"BRANCH-INT-RIGHTEQCD", R, OPC_BRANCH | OPC_BR_INT | OPC_BR_CD, 2},
    {"BRANCH-INT-RIGHTCD", R, OPC_BRANCH | OPC_BR_INT | OPC_BR_CD, 3}, 
    {"BRANCH-FP-S-EQUAL", R, OPC_BRANCH | OPC_BR_FP_S | OPC_BR_EQ, 0},
    {"BRANCH-FP-S-NOTEQUAL", R, OPC_BRANCH | OPC_BR_FP_S | OPC_BR_EQ, 1},
    {"BRANCH-FP-S-LEFTEQCD", R, OPC_BRANCH | OPC_BR_FP_S | OPC_BR_CD, 0},
    {"BRANCH-FP-S-LEFTCD", R, OPC_BRANCH | OPC_BR_FP_S | OPC_BR_CD, 1},
    {"BRANCH-FP-S-RIGHTEQCD", R, OPC_BRANCH | OPC_BR_FP_S | OPC_BR_CD, 2},
    {"BRANCH-FP-S-RIGHTCD", R, OPC_BRANCH | OPC_BR_FP_S | OPC_BR_CD, 3},
    {"BRANCH-FP-D-EQUAL", R, OPC_BRANCH | OPC_BR_FP_D | OPC_BR_EQ, 0},
    {"BRANCH-FP-D-NOTEQUAL", R, OPC_BRANCH | OPC_BR_FP_D | OPC_BR_EQ, 1},
    {"BRANCH-FP-D-LEFTEQCD", R, OPC_BRANCH | OPC_BR_FP_D | OPC_BR_CD, 0},
    {"BRANCH-FP-D-LEFTCD", R, OPC_BRANCH | OPC_BR_FP_D | OPC_BR_CD, 1},
    {"BRANCH-FP-D-RIGHTEQCD", R, OPC_BRANCH | OPC_BR_FP_D | OPC_BR_CD, 2},
    {"BRANCH-FP-D-RIGHTCD", R, OPC_BRANCH | OPC_BR_FP_D | OPC_BR_CD, 3},
     
    {"FP-S-ADD", R, OPC_FP_S | OPC_FALU, 0},
    {"FP-S-SUB", R, OPC_FP_S | OPC_FALU, 1},
    {"FP-D-ADD", R, OPC_FP_D | OPC_FALU, 0},
    {"FP-D-SUB", R, OPC_FP_D | OPC_FALU, 1},
    {"FP-S-MUL", R, OPC_FP_S | OPC_FMUL, 0},
    {"FP-S-DIV", R, OPC_FP_S | OPC_FMUL, 1},
    {"FP-D-MUL", R, OPC_FP_D | OPC_FMUL, 0},
    {"FP-D-DIV", R, OPC_FP_D | OPC_FMUL, 1},
    {"FP-S-SQRT", BR, OPC_FP_S | OPC_FSQRT, 0},
    {"FP-D-SQRT", BR, OPC_FP_D | OPC_FSQRT, 1}, 
    {"INT2FP-S", M, OPC_I2F, 0},
    {"INT2FP-D", M, OPC_I2F, 1},
    {"FP2INT-S", M, OPC_F2I, 0},
    {"FP2INT-D", M, OPC_F2I, 1},

    {"NOP", B, OPC_SYSTEM | 0x3, 0},
    {"MMU-SET", B, OPC_SYSTEM | 0x4, 0},
    {"INTERRUPT-TYPE", BR, OPC_SYSTEM | 0x5, 0},
    {"SET-TYPE", B, OPC_SYSTEM | 0x6, 0},
    {"SYSTEM-CALL", B, OPC_SYSTEM | 0x7, 0}
};

struct register_type{
    const char regnum;
    const char* name;
    const char type;    
};

enum Reg_type{
    REG_ZERO,
    REG_POINTER,
    REG_FUNCARGU,
    REG_FSAVED,
    REG_TEMP,
    REG_INTERRUPT,
    REG_KERNEL
}REGTYPE;

const struct register_type vz32_list_registers[] = {
    {0, "Zero", REG_ZERO},
    {1, "Back", REG_POINTER},
    {2, "BP", REG_POINTER},
    {3, "SP", REG_POINTER},
    {4, "i0 / Fa1", REG_FUNCARGU},
    {5, "i1 / Fa2", REG_FUNCARGU},
    {6, "i2 / Fa3", REG_FUNCARGU},
    {7, "i3 / Fa4", REG_FUNCARGU},
    {8, "i4 / Fa5", REG_FUNCARGU},
    {9, "i5 / Fa6", REG_FUNCARGU},
    {10, "i6 / Sr1", REG_FSAVED},
    {11, "i7 / Sr2", REG_FSAVED},
    {12, "i8 / Sr3", REG_FSAVED},
    {13, "i9 / Sr4", REG_FSAVED},
    {14, "i10 / Sr5", REG_FSAVED},
    {15, "i11 / Sr6", REG_FSAVED},
    {16, "i12 / Sr7", REG_FSAVED},
    {17, "i13 / Sr8", REG_FSAVED},
    {18, "i14 / Tm1", REG_TEMP},
    {19, "i15 / Tm2", REG_TEMP},
    {20, "i16 / Tm3", REG_TEMP},
    {21, "i17 / Tm4", REG_TEMP},
    {22, "i18 / Tm5", REG_TEMP},
    {23, "i19 / Tm6 / DIV_RMD", REG_TEMP},
    {24, "IntrName", REG_INTERRUPT},
    {25, "IntrType", REG_INTERRUPT},
    {26, "IntrData1", REG_INTERRUPT},
    {27, "IntrData2", REG_INTERRUPT},
    {28, "K0", REG_KERNEL},
    {29, "K1", REG_KERNEL},
    {30, "K2", REG_KERNEL},
    {31, "K3", REG_KERNEL}
};

static const char* vz32_name_normal_opcode[32] = {
    "zero", "back", "bp", "sp", 
    "i0", "i1", "i2", "i3",
    "i4", "i5", "i6", "i7",
    "i8", "i9", "i10", "i11",
    "i12", "i13", "i14", "i15",
    "i16", "i17", "i18", "i19",
    "intrn", "intrt", "intrd1", "intrd2",
    "k0", "k1", "k2", "k3"
};

static const char* vz32_name_functional_opcode[32] = {
    "zero", "back", "bp", "sp", 
    "fa1", "fa2", "fa3", "fa4", "fa5", "fa6",
    "sr1", "sr2", "sr3", "sr4", "sr5", "sr6", "sr7", "sr8",
    "tm1", "tm2", "tm3", "tm4", "tm5", "tm6",
    "intrn", "intrt", "intrd1", "intrd2",
    "k0", "k1", "k2", "k3"
};

enum CpuMode{
    RING_KERNEL,
    RING_HYPERVISOR,
    RING_DRIVER,
    RING_USERAPP
}CPURING;

#endif`; // Text Example