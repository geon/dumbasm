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

// https://cc65.github.io/doc/ca65.html#toc4.1
const ca65Syntax = `
        Label:                          ; A label and a comment
                lda     #$20            ; A 6502 instruction plus comment
        L1:     ldx     #$20            ; Same with label
        L2:     .byte   "Hello world"   ; Label plus control command
                mymac   $20             ; Macro expansion
                MySym = 3*L1            ; Symbol definition
        MaSym   = Label                 ; Another symbol
`;

export const asmSamples = {
	helloWorld,
	ca65Syntax,
};
