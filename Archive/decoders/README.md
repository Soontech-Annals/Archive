# decoders
3 Result(s)

# [1.16; 1.17.1; -] [DC01](DC01%206%20Bit%20Binary%20Decoder): [6 Bit Binary Decoder](DC01%206%20Bit%20Binary%20Decoder/DC01_6_Bit_Decoder.pdf)
### *By Dzreams*

The DC01 decoder takes six bits and outputs a pulse at one of 64 slices corresponding to the code.

<img src="DC01%206%20Bit%20Binary%20Decoder/6bit.png?raw=1">

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

<img src="DC02%202%20Digit%20Decimal%20Decoder/decoderfront.png?raw=1">

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

<img src="DC03%2010BPS%202%20Digit%20Decimal%20Decoder/bps.png?raw=1">

#### Features:
- O(n) linear time decoding, 2 gt/block. Signal travels 10 blocks per second.
- Slim profile. 4 blocks wide.
- Hopperspeed throughput.
- QC based logic with state auto-fix line.

#### Download Info:
|Identifier   | MC       | File                                                                                                                                            | Description                                                                           |
|------------ |:-------- |:----------------------------------------------------------------------------------------------------------------------------------------------- |:--------------------------------------------------------------------------------------|
|DC03         | 1.18.2   | [DC03_10BPS_decimal_decoder_1.18.2.litematic](DC03%2010BPS%202%20Digit%20Decimal%20Decoder/DC03_10BPS_decimal_decoder_1.18.2.litematic?raw=1)   | Litematic of decoder. Includes subregions for testing. Does not include inventories.  |
