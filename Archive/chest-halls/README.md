# chest-halls
1 Result(s)

# [1.16; 1.18.2; -] [CH01](CH01%20Parallelized%20Encoded%20Chest%20Hall): [Parallelized Encoded Chest Hall](CH01%20Parallelized%20Encoded%20Chest%20Hall/CH01_Parallelized_Encoded_Chest_Hall.pdf)
### *By Andrews54757*

The CH01 is a fully hopperlocked 10 item per slice encoded chest hall with a backend sporting up to 20x HS parallelization. It is able to insert both loose items and boxes into chests allowing for item/box hybrid functionality.

The transport mechanism for this hall does not support overflow protection. Extra items may despawn. It is recommended that the comparator readouts are used to limit the insertion amounts as needed to prevent overflow.

Comparator readouts are streamed from the chests at 10 codes / 8 gt. This is initiated by a pulsed signal.

All toggle states are self-repairable. The repair process is initiated by a pulsed signal.

<img src="CH01%20Parallelized%20Encoded%20Chest%20Hall/chesthall.png?raw=1" style="max-height: 300px">

#### Features:
- 800 chests, 10 chests per slice with 24 blocks of width
- Fully parallelizable (19x hopperspeed for items, 1x hopperspeed for box insertion)
- 100% hopperlocked with sectional unlocking
- 10/8 gt streamed comparator outputs
- Self-repairable toggle states with Auto-Fix sequence
- Low active lag, +1 ms at 1x HS, +6 ms at 20x HS

#### Download Info:
|Identifier   | MC       | File                                                                                                                                | Description                                |
|------------ |:-------- |:----------------------------------------------------------------------------------------------------------------------------------- |:-------------------------------------------|
|CH01         | 1.18.2   | [CH01_encoded_chest_hall_p30.litematic](CH01%20Parallelized%20Encoded%20Chest%20Hall/CH01_encoded_chest_hall_p30.litematic?raw=1)   | Litematic of chest hall with inventories.  |
