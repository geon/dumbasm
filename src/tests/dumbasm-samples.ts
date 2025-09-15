const helloWorldWithVariablesOnly = `
	; *=$8000 ; sys 32768

	regY uint8 index
	ld index #0
loop:
	regA uint8 char
	ld char message,index
	beq done
	jsr $ffd2
	inc index
	jmp loop
done:
	rts

message:
	.byte 147 ; clear
	.text "HELLO WORLD"
	.byte 0 ; null terminator
`;

export const dumbasmSamples = {
	helloWorldWithVariablesOnly,
};
