# transport
2 Result(s)

# [1.16; 1.17.1; -] [TP01](TP01%20Decimal%20Encoded%20Variable%20Instant%20Dropperline): [Decimal Encoded Variable Instant Dropperline](TP01%20Decimal%20Encoded%20Variable%20Instant%20Dropperline/TP01_Decimal_Encoded_Variable_Instant_Dropperline.pdf)
### *By Andrews54757*

Takes two comparator inputs (one decimal, one half-decimal) and deposits items in the decoded slice in constant time. The dropperline is fired twice per insertion to clear any potential overflow items. 10gt-able.

<img src="TP01%20Decimal%20Encoded%20Variable%20Instant%20Dropperline/vardrop2.png?raw=1" style="max-height: 300px">

#### Features:
- Constant time insertion
- 10gt throughput
- Fired twice for overflow handling

#### Download Info:
|Identifier   | MC       | File                                                                                                                                                                                           | Description           |
|------------ |:-------- |:---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |:----------------------|
|TP01         | 1.17.1   | [TP01_Decimal_Encoded_Variable_Instant_Dropperline.litematic](TP01%20Decimal%20Encoded%20Variable%20Instant%20Dropperline/TP01_Decimal_Encoded_Variable_Instant_Dropperline.litematic?raw=1)   | Schematic of device.  |



# [1.16; 1.17.1; -] [TP02](TP02%20Pipelined%20Encoded%20Variable%20Waterstream): [Pipelined Encoded Variable Waterstream](TP02%20Pipelined%20Encoded%20Variable%20Waterstream/TP02_Pipelined_Encoded_Variable_Waterstream.pdf)
### *By Andrews54757*

Takes a 6 bit binary code and deposits items in the decoded slice in linear time O(n). Pipeline-able for massively parallelized chest halls. Uses overstacked comparators with a 10bps waterstream to keep item entity and code in sync. Can execute an operation every 16gt.

<img src="TP02%20Pipelined%20Encoded%20Variable%20Waterstream/pipe.png?raw=1" style="max-height: 300px">

#### Features:
- O(n) insertion time with 10BPS waterstream.
- 16gt throughput
- Pipelined for parallelization.

#### Download Info:
|Identifier   | MC       | File                                                                                                                                                                       | Description           |
|------------ |:-------- |:-------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |:----------------------|
|TP02         | 1.17.1   | [TP02_Pipelined_Encoded_Variable_Waterstream.litematic](TP02%20Pipelined%20Encoded%20Variable%20Waterstream/TP02_Pipelined_Encoded_Variable_Waterstream.litematic?raw=1)   | Schematic of device.  |
