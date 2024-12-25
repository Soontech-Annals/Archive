# decoders
5 Result(s)

# [1.16; 1.17.1; -] [DC01](DC01%206%20Bit%20Binary%20Decoder): [6 Bit Binary Decoder](DC01%206%20Bit%20Binary%20Decoder/DC01_6_Bit_Decoder.pdf)
### *By Dzreams*

The DC01 decoder takes six bits and outputs a pulse at one of 64 slices corresponding to the code.

<img src="DC01%206%20Bit%20Binary%20Decoder/6bit.png?raw=1" height="300px">

#### Features:
- Constant time decoding. 14gt latency.
- Slim profile. 4 blocks wide.
- 6gt throughput.
- QC based logic.

#### Download Info:
|Identifier   | MC       | File                                                                                                 | Description            |
|------------ |:-------- |:---------------------------------------------------------------------------------------------------- |:-----------------------|
|DC01         | 1.17.1   | [DC01_6bit_decoder.litematic](DC01%206%20Bit%20Binary%20Decoder/DC01_6bit_decoder.litematic?raw=1)   | Litematic of decoder.  |



# [1.16; 1.17.1; -] [DC02](DC02%202%20Digit%20Decimal%20Decoder): [2 Digit Decimal Decoder](DC02%202%20Digit%20Decimal%20Decoder/DC02_2_Digit_Decimal_Decoder.pdf)
### *By Andrews54757*

The DC02 decoder takes two decimal digits and outputs a pulse at one of 100 slices corresponding to the code.

<img src="DC02%202%20Digit%20Decimal%20Decoder/decoderfront.png?raw=1" height="300px">

#### Features:
- Constant time decoding. 30gt latency.
- Slim profile. 4 blocks wide.
- Hopperspeed throughput.
- QC based logic with state auto-fix line.

#### Download Info:
|Identifier   | MC       | File                                                                                                                        | Description                                             |
|------------ |:-------- |:--------------------------------------------------------------------------------------------------------------------------- |:--------------------------------------------------------|
|DC02         | 1.17.1   | [DC02_2Digit_Decimal_Decoder.litematic](DC02%202%20Digit%20Decimal%20Decoder/DC02_2Digit_Decimal_Decoder.litematic?raw=1)   | Litematic of decoder. Includes subregions for testing.  |



# [1.13; 1.18.2; -] [DC03](DC03%2010BPS%202%20Digit%20Decimal%20Decoder): [10BPS 2 Digit Decimal Decoder](DC03%2010BPS%202%20Digit%20Decimal%20Decoder/DC03_10BPS_2_Digit_Decimal_Decoder.pdf)
### *By Andrews54757*

The DC03 decoder takes two decimal digits and outputs a pulse at one of 100 slices corresponding to the code. The signal travels 10 blocks per second giving the device an O(n) time complexity.

<img src="DC03%2010BPS%202%20Digit%20Decimal%20Decoder/bps.png?raw=1" height="300px">

#### Features:
- O(n) linear time decoding, 2 gt/block. Signal travels 10 blocks per second.
- Slim profile. 4 blocks wide.
- Hopperspeed throughput.
- QC based logic with state auto-fix line.

#### Download Info:
|Identifier   | MC       | File                                                                                                                                            | Description                                                                           |
|------------ |:-------- |:----------------------------------------------------------------------------------------------------------------------------------------------- |:--------------------------------------------------------------------------------------|
|DC03         | 1.18.2   | [DC03_10BPS_decimal_decoder_1.18.2.litematic](DC03%2010BPS%202%20Digit%20Decimal%20Decoder/DC03_10BPS_decimal_decoder_1.18.2.litematic?raw=1)   | Litematic of decoder. Includes subregions for testing. Does not include inventories.  |



# [1.11; 1.19.3; -] [DC04](DC04%20Dual%20Sided%206%20Bit%20Binary%20Decoder): [Dual Sided 6 Bit Binary Decoder](DC04%20Dual%20Sided%206%20Bit%20Binary%20Decoder/DC04_Dual_Sided_6_Bit_Binary_Decoder.pdf)
### *By FloppyDonkey*

The DC04 decoder takes six bits and outputs a pulse at one of 64 slices corresponding to the code. The device is dual sided, meaning it can output a signal to one of two different sides. This effectively adds another bit to the decoder, allowing for 128 different outputs.

<img src="DC04%20Dual%20Sided%206%20Bit%20Binary%20Decoder/dualdecoder.png?raw=1" height="300px">

#### Features:
- Dual sided outputs.
- Signal travels 100 blocks per second.
- No 1gt offset needed. This is achieved through a combination of TTP to get the proper update order, and some rail diodes.
- Minimal flashing rails. QC based logic with BUDed rails.
- Hopperspeed throughput.

#### Download Info:
|Identifier   | MC     | File                                                                                                                                                                | Description            |
|------------ |:------ |:------------------------------------------------------------------------------------------------------------------------------------------------------------------- |:-----------------------|
|DC04         | 1.17   | [DC04_Dual_Sided_6_Bit_Binary_Decoder_1.17.litematic](DC04%20Dual%20Sided%206%20Bit%20Binary%20Decoder/DC04_Dual_Sided_6_Bit_Binary_Decoder_1.17.litematic?raw=1)   | Litematic of decoder.  |



# [1.13; 1.19.3; -] [DC05](DC05%204-9%20Bit%20Binary%20Decoder%20With%20Top%20Output): [4-9 Bit Binary Decoder With Top Output](DC05%204-9%20Bit%20Binary%20Decoder%20With%20Top%20Output/DC05_4-9_Bit_Binary_Decoder_With_Top_Output.pdf)
### *By Basil, & Crain*

The DC05 decoder takes 4 bits and outputs a pulse at one of 16 slices corresponding to the code. The device can be expanded to 9 bits of input. The output can be taken from the top of the device.

<img src="DC05%204-9%20Bit%20Binary%20Decoder%20With%20Top%20Output/decoderpic.png?raw=1" height="300px">

#### Features:
- Can be expanded to up to 9 bits of input.
- Outputs can be taken from the top. (Observe rail state for output)
- 11 gt latency and 8 gt throughput.

#### Download Info:
|Identifier   | MC       | File                                                                                                                                                                             | Description           |
|------------ |:-------- |:-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |:----------------------|
|DC05         | 1.19.3   | [DC05_4-9_Bit_Binary_Decoder_With_Top_Output.litematic](DC05%204-9%20Bit%20Binary%20Decoder%20With%20Top%20Output/DC05_4-9_Bit_Binary_Decoder_With_Top_Output.litematic?raw=1)   | Schematic of device.  |
