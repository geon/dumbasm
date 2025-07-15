// https://www.masswerk.at/6502/6502_instruction_set.html

export const mos6502Mnemonics = [
	"adc",
	"and",
	"asl",
	"bcc",
	"bcs",
	"beq",
	"bit",
	"bmi",
	"bne",
	"bpl",
	"brk",
	"bvc",
	"bvs",
	"clc",
	"cld",
	"cli",
	"clv",
	"cmp",
	"cpx",
	"cpy",
	"dec",
	"dex",
	"dey",
	"eor",
	"inc",
	"inx",
	"iny",
	"jmp",
	"jsr",
	"lda",
	"ldx",
	"ldy",
	"lsr",
	"nop",
	"ora",
	"pha",
	"php",
	"pla",
	"plp",
	"rol",
	"ror",
	"rti",
	"rts",
	"sbc",
	"sec",
	"sed",
	"sei",
	"sta",
	"stx",
	"sty",
	"tax",
	"tay",
	"tsx",
	"txa",
	"txs",
	"tya",
] as const;

export type Mos6502Mnemonic = (typeof mos6502Mnemonics)[number];

export const mos6502AddressingModesOfInstructions = {
	// add with carry
	adc: [
		"immediate",
		"zeropage",
		"zeropage,X",
		"absolute",
		"absolute,X",
		"absolute,Y",
		"(indirect,X)",
		"(indirect),Y",
	],
	// and (with accumulator)
	and: [
		"immediate",
		"zeropage",
		"zeropage,X",
		"absolute",
		"absolute,X",
		"absolute,Y",
		"(indirect,X)",
		"(indirect),Y",
	],
	// arithmetic shift left
	asl: ["accumulator", "zeropage", "zeropage,X", "absolute", "absolute,X"],
	// branch on carry clear
	bcc: ["relative"],
	// branch on carry set
	bcs: ["relative"],
	// branch on equal (zero set)
	beq: ["relative"],
	// bit test
	bit: ["zeropage", "absolute"],
	// branch on minus (negative set)
	bmi: ["relative"],
	// branch on not equal (zero clear)
	bne: ["relative"],
	// branch on plus (negative clear)
	bpl: ["relative"],
	// break / interrupt
	brk: ["implied"],
	// branch on overflow clear
	bvc: ["relative"],
	// branch on overflow set
	bvs: ["relative"],
	// clear carry
	clc: ["implied"],
	// clear decimal
	cld: ["implied"],
	// clear interrupt disable
	cli: ["implied"],
	// clear overflow
	clv: ["implied"],
	// compare (with accumulator)
	cmp: [
		"immediate",
		"zeropage",
		"zeropage,X",
		"absolute",
		"absolute,X",
		"absolute,Y",
		"(indirect,X)",
		"(indirect),Y",
	],
	// compare with X
	cpx: ["immediate", "zeropage", "absolute"],
	// compare with Y
	cpy: ["immediate", "zeropage", "absolute"],
	// decrement
	dec: ["zeropage", "zeropage,X", "absolute", "absolute,X"],
	// decrement X
	dex: ["implied"],
	// decrement Y
	dey: ["implied"],
	// exclusive or (with accumulator)
	eor: [
		"immediate",
		"zeropage",
		"zeropage,X",
		"absolute",
		"absolute,X",
		"absolute,Y",
		"(indirect,X)",
		"(indirect),Y",
	],
	// increment
	inc: ["zeropage", "zeropage,X", "absolute", "absolute,X"],
	// increment X
	inx: ["implied"],
	// increment Y
	iny: ["implied"],
	// jump
	jmp: ["absolute", "indirect"],
	// jump subroutine
	jsr: ["absolute"],
	// load accumulator
	lda: [
		"immediate",
		"zeropage",
		"zeropage,X",
		"absolute",
		"absolute,X",
		"absolute,Y",
		"(indirect,X)",
		"(indirect),Y",
	],
	// load X
	ldx: ["immediate", "zeropage", "zeropage,X", "absolute", "absolute,X"],
	// load Y
	ldy: ["immediate", "zeropage", "zeropage,X", "absolute", "absolute,X"],
	// logical shift right
	lsr: ["accumulator", "zeropage", "zeropage,X", "absolute", "absolute,X"],
	// no operation
	nop: ["implied"],
	// or with accumulator
	ora: [
		"immediate",
		"zeropage",
		"zeropage,X",
		"absolute",
		"absolute,X",
		"absolute,Y",
		"(indirect,X)",
		"(indirect),Y",
	],
	// push accumulator
	pha: ["implied"],
	// push processor status (SR)
	php: ["implied"],
	// pull accumulator
	pla: ["implied"],
	// pull processor status (SR)
	plp: ["implied"],
	// rotate left
	rol: ["accumulator", "zeropage", "zeropage,X", "absolute", "absolute,X"],
	// rotate right
	ror: ["accumulator", "zeropage", "zeropage,X", "absolute", "absolute,X"],
	// return from interrupt
	rti: ["implied"],
	// return from subroutine
	rts: ["implied"],
	// subtract with carry
	sbc: [
		"immediate",
		"zeropage",
		"zeropage,X",
		"absolute",
		"absolute,X",
		"absolute,Y",
		"(indirect,X)",
		"(indirect),Y",
	],
	// set carry
	sec: ["implied"],
	// set decimal
	sed: ["implied"],
	// set interrupt disable
	sei: ["implied"],
	// store accumulator
	sta: [
		"zeropage",
		"zeropage,X",
		"absolute",
		"absolute,X",
		"absolute,Y",
		"(indirect,X)",
		"(indirect),Y",
	],
	// store X
	stx: ["zeropage", "zeropage,Y", "absolute"],
	// store Y
	sty: ["zeropage", "zeropage,X", "absolute"],
	// transfer accumulator to X
	tax: ["implied"],
	// transfer accumulator to Y
	tay: ["implied"],
	// transfer stack pointer to X
	tsx: ["implied"],
	// transfer X to accumulator
	txa: ["implied"],
	// transfer X to stack pointer
	txs: ["implied"],
	// transfer Y to accumulator
	tya: ["implied"],
} as const satisfies Record<Mos6502Mnemonic, readonly string[]>;

export type Mos6502AddressingModeOfInstruction<
	Mnemonic extends Mos6502Mnemonic,
> = (typeof mos6502AddressingModesOfInstructions)[Mnemonic][number];

export type Mos6502AddressingMode =
	Mos6502AddressingModeOfInstruction<Mos6502Mnemonic>;

export type Mos6502Operand<
	AddressingMode extends Mos6502AddressingMode,
	T,
> = AddressingMode extends "accumulator" | "implied" ? undefined : T;
