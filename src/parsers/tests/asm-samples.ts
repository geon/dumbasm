// https://github.com/jawuku/hello-world/blob/master/c64-helloworld.asm
const helloWorld = `
.export Start

Start:
		ldy #0
loop:   lda message,Y
		jsr $ffd2
		iny
		cpy #14 ; Check if the char was 13=newline before the inc.
		bne loop
		rts

message: .byte 147
		.text "hello world"
		.byte 13
		.byte 10
`;

export const asmSamples = {
	helloWorld,
};
