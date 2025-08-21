const variableDeclaration = `
lda #0
uint8 foo
uint8 bar
`;

const helloWorld = `
.export Start

Start:
		regY uint8 index
		ld index #0
		regA uint8 char 
loop:   ld char message,index
		jsr $ffd2
		incr index 
		cp index #14
		bne loop
		rts

message: .byte 147
		.text "hello world"
		.byte 13
		.byte 10
`;

export const dumbasmSamples = {
	variableDeclaration,
	helloWorld,
};
