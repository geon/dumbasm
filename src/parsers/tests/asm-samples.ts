const helloWorld = `
	; *=$8000 ; sys 32768

	ldy #0
loop:
	lda message,Y
	beq done
	jsr $ffd2
	iny
	jmp loop
done:
	rts

message:
	.byte 147 ; clear
	.text "HELLO WORLD"
	.byte 0 ; null terminator
`;

export const asmSamples = {
	helloWorld,
};
