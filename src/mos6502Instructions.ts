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
	adc: new Set([
		"immediate",
		"zeropage",
		"zeropage,X",
		"absolute",
		"absolute,X",
		"absolute,Y",
		"(indirect,X)",
		"(indirect),Y",
	] as const),
	// and (with accumulator)
	and: new Set([
		"immediate",
		"zeropage",
		"zeropage,X",
		"absolute",
		"absolute,X",
		"absolute,Y",
		"(indirect,X)",
		"(indirect),Y",
	] as const),
	// arithmetic shift left
	asl: new Set([
		"accumulator",
		"zeropage",
		"zeropage,X",
		"absolute",
		"absolute,X",
	] as const),
	// branch on carry clear
	bcc: new Set(["relative"] as const),
	// branch on carry set
	bcs: new Set(["relative"] as const),
	// branch on equal (zero set)
	beq: new Set(["relative"] as const),
	// bit test
	bit: new Set(["zeropage", "absolute"] as const),
	// branch on minus (negative set)
	bmi: new Set(["relative"] as const),
	// branch on not equal (zero clear)
	bne: new Set(["relative"] as const),
	// branch on plus (negative clear)
	bpl: new Set(["relative"] as const),
	// break / interrupt
	brk: new Set(["implied"] as const),
	// branch on overflow clear
	bvc: new Set(["relative"] as const),
	// branch on overflow set
	bvs: new Set(["relative"] as const),
	// clear carry
	clc: new Set(["implied"] as const),
	// clear decimal
	cld: new Set(["implied"] as const),
	// clear interrupt disable
	cli: new Set(["implied"] as const),
	// clear overflow
	clv: new Set(["implied"] as const),
	// compare (with accumulator)
	cmp: new Set([
		"immediate",
		"zeropage",
		"zeropage,X",
		"absolute",
		"absolute,X",
		"absolute,Y",
		"(indirect,X)",
		"(indirect),Y",
	] as const),
	// compare with X
	cpx: new Set(["immediate", "zeropage", "absolute"] as const),
	// compare with Y
	cpy: new Set(["immediate", "zeropage", "absolute"] as const),
	// decrement
	dec: new Set(["zeropage", "zeropage,X", "absolute", "absolute,X"] as const),
	// decrement X
	dex: new Set(["implied"] as const),
	// decrement Y
	dey: new Set(["implied"] as const),
	// exclusive or (with accumulator)
	eor: new Set([
		"immediate",
		"zeropage",
		"zeropage,X",
		"absolute",
		"absolute,X",
		"absolute,Y",
		"(indirect,X)",
		"(indirect),Y",
	] as const),
	// increment
	inc: new Set(["zeropage", "zeropage,X", "absolute", "absolute,X"] as const),
	// increment X
	inx: new Set(["implied"] as const),
	// increment Y
	iny: new Set(["implied"] as const),
	// jump
	jmp: new Set(["absolute", "indirect"] as const),
	// jump subroutine
	jsr: new Set(["absolute"] as const),
	// load accumulator
	lda: new Set([
		"immediate",
		"zeropage",
		"zeropage,X",
		"absolute",
		"absolute,X",
		"absolute,Y",
		"(indirect,X)",
		"(indirect),Y",
	] as const),
	// load X
	ldx: new Set([
		"immediate",
		"zeropage",
		"zeropage,X",
		"absolute",
		"absolute,X",
	] as const),
	// load Y
	ldy: new Set([
		"immediate",
		"zeropage",
		"zeropage,X",
		"absolute",
		"absolute,X",
	] as const),
	// logical shift right
	lsr: new Set([
		"accumulator",
		"zeropage",
		"zeropage,X",
		"absolute",
		"absolute,X",
	] as const),
	// no operation
	nop: new Set(["implied"] as const),
	// or with accumulator
	ora: new Set([
		"immediate",
		"zeropage",
		"zeropage,X",
		"absolute",
		"absolute,X",
		"absolute,Y",
		"(indirect,X)",
		"(indirect),Y",
	] as const),
	// push accumulator
	pha: new Set(["implied"] as const),
	// push processor status (SR)
	php: new Set(["implied"] as const),
	// pull accumulator
	pla: new Set(["implied"] as const),
	// pull processor status (SR)
	plp: new Set(["implied"] as const),
	// rotate left
	rol: new Set([
		"accumulator",
		"zeropage",
		"zeropage,X",
		"absolute",
		"absolute,X",
	] as const),
	// rotate right
	ror: new Set([
		"accumulator",
		"zeropage",
		"zeropage,X",
		"absolute",
		"absolute,X",
	] as const),
	// return from interrupt
	rti: new Set(["implied"] as const),
	// return from subroutine
	rts: new Set(["implied"] as const),
	// subtract with carry
	sbc: new Set([
		"immediate",
		"zeropage",
		"zeropage,X",
		"absolute",
		"absolute,X",
		"absolute,Y",
		"(indirect,X)",
		"(indirect),Y",
	] as const),
	// set carry
	sec: new Set(["implied"] as const),
	// set decimal
	sed: new Set(["implied"] as const),
	// set interrupt disable
	sei: new Set(["implied"] as const),
	// store accumulator
	sta: new Set([
		"zeropage",
		"zeropage,X",
		"absolute",
		"absolute,X",
		"absolute,Y",
		"(indirect,X)",
		"(indirect),Y",
	] as const),
	// store X
	stx: new Set(["zeropage", "zeropage,Y", "absolute"] as const),
	// store Y
	sty: new Set(["zeropage", "zeropage,X", "absolute"] as const),
	// transfer accumulator to X
	tax: new Set(["implied"] as const),
	// transfer accumulator to Y
	tay: new Set(["implied"] as const),
	// transfer stack pointer to X
	tsx: new Set(["implied"] as const),
	// transfer X to accumulator
	txa: new Set(["implied"] as const),
	// transfer X to stack pointer
	txs: new Set(["implied"] as const),
	// transfer Y to accumulator
	tya: new Set(["implied"] as const),
} as const satisfies Record<Mos6502Mnemonic, ReadonlySet<string>>;

type SetType<TSet extends ReadonlySet<unknown>> =
	TSet extends ReadonlySet<infer T> ? T : never;

export type Mos6502AddressingModeOfInstruction<
	Mnemonic extends Mos6502Mnemonic,
> = SetType<(typeof mos6502AddressingModesOfInstructions)[Mnemonic]>;

export type Mos6502AddressingMode =
	Mos6502AddressingModeOfInstruction<Mos6502Mnemonic>;

export type Mos6502Operand<
	AddressingMode extends Mos6502AddressingMode,
	T,
> = AddressingMode extends "accumulator" | "implied" ? undefined : T;
