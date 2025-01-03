# logic-and-computation
9 Result(s)

# [1.13; 1.17.1; -] [LC01](LC01%201%20Wide%20Redcoder): [1 Wide Redcoder](LC01%201%20Wide%20Redcoder/LC01_1_Wide_Redcoder.pdf)
### *By Andrews54757*

The LC01 1 wide redcoder takes a pulsed analog signal and outputs a pulse at one of 15 slices corresponding to the code.

<img src="LC01%201%20Wide%20Redcoder/redcoder.png?raw=1" height="300px">

#### Features:
- 1 Wide
- Stateless, uses quasi-based logic

#### Download Info:
|Identifier   | MC       | File                                                                                        | Description           |
|------------ |:-------- |:------------------------------------------------------------------------------------------- |:----------------------|
|LC01         | 1.17.1   | [LC01_1w_redcoder.litematic](LC01%201%20Wide%20Redcoder/LC01_1w_redcoder.litematic?raw=1)   | Schematic of device.  |



# [1.13; 1.17.1; -] [LC02](LC02%20Hopperspeed%20Hex%20to%20Binary): [Hopperspeed Hex to Binary](LC02%20Hopperspeed%20Hex%20to%20Binary/LC02_Hopperspeed_Hex_to_Binary.pdf)
### *By Andrews54757*

The LC02 Hopperspeed Hex to Binary takes a hex coded signal and outputs a binary coded signal. It is hopperspeed, meaning it can be used to convert a hex coded signal to a binary coded signal every 8 game ticks.

<img src="LC02%20Hopperspeed%20Hex%20to%20Binary/hextobin.png?raw=1" height="300px">

#### Features:
- Hopperspeed throughput
- Stateless, uses quasi-based logic
- 14gt Latency

#### Download Info:
|Identifier   | MC       | File                                                                                                                          | Description           |
|------------ |:-------- |:----------------------------------------------------------------------------------------------------------------------------- |:----------------------|
|LC02         | 1.17.1   | [LC02_hopperspeed_hex_to_bin.litematic](LC02%20Hopperspeed%20Hex%20to%20Binary/LC02_hopperspeed_hex_to_bin.litematic?raw=1)   | Schematic of device.  |



# [1.13; 1.17.1; -] [LC03](LC03%20Await%20Latch): [Await Latch](LC03%20Await%20Latch/LC03_Await_Latch.pdf)
### *By Andrews54757*

The LC03 Await Latch takes one pulse input and one boolean input. Pulse only goes through when boolean input is on. If it is off, it will wait until boolean input turns on and then send pulse. Won't break with random inputs.

<img src="LC03%20Await%20Latch/awaitlatch.png?raw=1" height="300px">

#### Features:
- 2 Wide and 2 High
- "Unbreakable"

#### Download Info:
|Identifier   | MC       | File                                                                                  | Description           |
|------------ |:-------- |:------------------------------------------------------------------------------------- |:----------------------|
|LC03         | 1.17.1   | [LC03_await_latch.litematic](LC03%20Await%20Latch/LC03_await_latch.litematic?raw=1)   | Schematic of device.  |



# [1.13; 1.17.1; -] [LC04](LC04%202gt%20Binary%20Stream%20Splitter): [2gt Binary Stream Splitter](LC04%202gt%20Binary%20Stream%20Splitter/LC04_2gt_Binary_Stream_Splitter.pdf)
### *By Andrews54757*

The LC04 binary stream splitter takes a 2gt repeater stream and splits it into two 4gt observer signal lines.

<img src="LC04%202gt%20Binary%20Stream%20Splitter/stream_split.png?raw=1" height="300px">

#### Features:
- Stateless, uses quasi-based logic

#### Download Info:
|Identifier   | MC       | File                                                                                                                                         | Description           |
|------------ |:-------- |:-------------------------------------------------------------------------------------------------------------------------------------------- |:----------------------|
|LC04         | 1.17.1   | [LC04_2gt_binary_stream_splitter_p1.litematic](LC04%202gt%20Binary%20Stream%20Splitter/LC04_2gt_binary_stream_splitter_p1.litematic?raw=1)   | Schematic of device.  |



# [1.13; 1.17.1; -] [LC05](LC05%20Stateless%20Find%20Nearest): [Stateless Find Nearest](LC05%20Stateless%20Find%20Nearest/LC05_Stateless_Find_Nearest.pdf)
### *By Andrews54757*

The LC05 find nearest dispenser outputs items from first filled dropper in line with each pulse. With an 8gt clock this will have an additional 8gt transition delay between groups. Items can be inserted during operation and the thing won't output multiple groups at same time by accident.

<img src="LC05%20Stateless%20Find%20Nearest/dispense.png?raw=1" height="300px">

#### Features:
- Stateless, uses quasi-based logic
- Will not output more than one group at a time, even with random slice activation/deactivation timings

#### Download Info:
|Identifier   | MC       | File                                                                                                                     | Description           |
|------------ |:-------- |:------------------------------------------------------------------------------------------------------------------------ |:----------------------|
|LC05         | 1.17.1   | [LC05_stateless_find_nearest.litematic](LC05%20Stateless%20Find%20Nearest/LC05_stateless_find_nearest.litematic?raw=1)   | Schematic of device.  |



# [1.16; 1.17.1; -] [LC06](LC06%20Stateless%2010%20Bit%20Double%20Dabble): [Stateless 10 Bit Double Dabble](LC06%20Stateless%2010%20Bit%20Double%20Dabble/LC06_Stateless_10_Bit_Double_Dabble.pdf)
### *By Andrews54757*

The LC06 device converts binary to binary coded decimal (binary -> decimal) using the combinational double dabble algorithm. 17 gt per level. Input can be clocked 8gt.

<img src="LC06%20Stateless%2010%20Bit%20Double%20Dabble/doubledabble.png?raw=1" height="300px">

#### Features:
- Stateless, uses quasi-based logic
- Hopperspeed throughput

#### Download Info:
|Identifier   | MC       | File                                                                                                                                               | Description           |
|------------ |:-------- |:-------------------------------------------------------------------------------------------------------------------------------------------------- |:----------------------|
|LC06         | 1.17.1   | [LC06_stateless_10bit_double_dabble.litematic](LC06%20Stateless%2010%20Bit%20Double%20Dabble/LC06_stateless_10bit_double_dabble.litematic?raw=1)   | Schematic of device.  |



# [1.16; 1.19.3; -] [LC07](LC07%20Decimal%20Delay%20Generator): [Decimal Delay Generator](LC07%20Decimal%20Delay%20Generator/LC07_Decimal_Delay_Generator.pdf)
### *By Andrews54757*

The LC07 Decimal Delay Generator takes a decimal input and outputs a pulse after a delay of 10 to 19 game ticks. The delay is equal to the input signal strength plus 5. The device can be used to generate precise extraction trigger signal for a 1 slot/gt iterator device.

<img src="LC07%20Decimal%20Delay%20Generator/decimaldelay.png?raw=1" height="300px">

#### Features:
- 10gt to 19gt variable delay
- SS5-14 input
- Not random activation timings safe

#### Download Info:
|Identifier   | MC       | File                                                                                                                        | Description                                        |
|------------ |:-------- |:--------------------------------------------------------------------------------------------------------------------------- |:---------------------------------------------------|
|LC07         | 1.19.3   | [LC07_Decimal_Delay_Generator.litematic](LC07%20Decimal%20Delay%20Generator/LC07_Decimal_Delay_Generator.litematic?raw=1)   | Schematic of device. Test input regions included.  |



# [1.16; 1.19.3; -] [LC08](LC08%20Precision%20Timings%20SIPO%20Register): [Precision Timings SIPO Register](LC08%20Precision%20Timings%20SIPO%20Register/LC08_Precision_Timings_SIPO_Register.pdf)
### *By Andrews54757*

The LC08 Precision Timings Serial Input Parallel Output (SIPO) Register seperates input signals by order of input. The device is capable of discriminating between signals sent in the same tick. The device is expandable, and can be used to decode crackpot encoding schemes.

<img src="LC08%20Precision%20Timings%20SIPO%20Register/sipo.png?raw=1" height="300px">

#### Features:
- Expandable, QC based "stateless" logic
- High precision timings support. Can discriminate order of signals sent in the same tick.

#### Download Info:
|Identifier   | MC       | File                                                                                                                                                  | Description           |
|------------ |:-------- |:----------------------------------------------------------------------------------------------------------------------------------------------------- |:----------------------|
|LC08         | 1.19.3   | [LC08_Precision_Timings_SIPO_Register.litematic](LC08%20Precision%20Timings%20SIPO%20Register/LC08_Precision_Timings_SIPO_Register.litematic?raw=1)   | Schematic of device.  |



# [1.13; 1.21.4; -] [LC09](LC09%20Tiny%20Request%20Manager): [Tiny Request Manager](LC09%20Tiny%20Request%20Manager/LC09_Tiny_Request_Manager.pdf)
### *By Basil, Heilz, & Skyzy*

The LC09 Tiny Request Manager is a device that can be used to queue requests in a system. It ensures that only one request is processed at a time regardless of random request timings. The device is infinitely expandable and can be paused. Note: Reset input is not rapid input proof.

<img src="LC09%20Tiny%20Request%20Manager/pic.png?raw=1" height="300px">

#### Features:
- Random input proof
- Infinitely expandable
- Pausable
- Compact. 8x4x5 volume.

#### Download Info:
|Identifier   | MC       | File                                                                                                                             | Description                                    |
|------------ |:-------- |:-------------------------------------------------------------------------------------------------------------------------------- |:-----------------------------------------------|
|LC09         | 1.21.4   | [LC09_Tiny_Request_Manager.litematic](LC09%20Tiny%20Request%20Manager/LC09_Tiny_Request_Manager.litematic?raw=1)                 | Schematic of device. Includes three variants.  |
|LC09B        | 1.19.3   | [LC09_Tiny_Request_Manager_1.19.3.litematic](LC09%20Tiny%20Request%20Manager/LC09_Tiny_Request_Manager_1.19.3.litematic?raw=1)   | Schematic of device for older versions.        |
