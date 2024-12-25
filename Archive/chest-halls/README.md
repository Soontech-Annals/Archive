# chest-halls
2 Result(s)

# [1.16; 1.18.2; -] [CH01](CH01%20Parallelized%20Encoded%20Chest%20Hall): [Parallelized Encoded Chest Hall](CH01%20Parallelized%20Encoded%20Chest%20Hall/CH01_Parallelized_Encoded_Chest_Hall.pdf)
### *By Andrews54757*

The CH01 is a fully hopperlocked 10 item per slice encoded chest hall with a backend sporting up to 20x HS parallelization. It is able to insert both loose items and boxes into chests allowing for item/box hybrid functionality.

The transport mechanism for this hall does not support overflow protection. Extra items may despawn. It is recommended that the comparator readouts are used to limit the insertion amounts as needed to prevent overflow.

Comparator readouts are streamed from the chests at 10 codes / 8 gt. This is initiated by a pulsed signal.

All toggle states are self-repairable. The repair process is initiated by a pulsed signal.

<img src="CH01%20Parallelized%20Encoded%20Chest%20Hall/chesthall.png?raw=1" height="300px">

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



# [1.20; 1.20.1; -] [CH02](CH02%20Parallelized%20Encoded%20Chest%20Hall%20Using%20Discs): [Parallelized Encoded Chest Hall Using Discs](CH02%20Parallelized%20Encoded%20Chest%20Hall%20Using%20Discs/CH02_Parallelized_Encoded_Chest_Hall_Using_Discs.pdf)
### *By JayRoi*

The CH02 Parallelized Encoded Chest Hall Using Discs is a demonstrative prototype of a parallelized unloading logic inspired by Andrews54757's chest hall. However, the system is designed to be more compact and efficient by using discs to encode the chest locations instead of embedded redstone memory.

Single shulkerboxes and their codes can be custom ordered to specific unloading conditions as chosen by the player, though the intention is these orders would be externally automated. Orders can be programmed to unload a single box to a certain amount from the box, insert additional boxes, or only insert boxes. The hall can process up to 10 orders at a time, allowing for roughly 10x hopperspeed parallelization.

<img src="CH02%20Parallelized%20Encoded%20Chest%20Hall%20Using%20Discs/pic.png?raw=1" height="300px">

#### Features:
- 540 chests, 10 chests per slice.
- 25 block wide slices.
- Fully parallelizable (10x hopperspeed for items, 1x hopperspeed for box insertion)
- 100% hopperlocked with sectional unlocking
- Self-repairable toggle states with Auto-Fix sequence

#### Download Info:
|Identifier   | MC       | File                                                                                                                                                                                          | Description           |
|------------ |:-------- |:--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |:----------------------|
|CH02         | 1.20.1   | [CH02_Parallelized_Encoded_Chest_Hall_Using_Discs.litematic](CH02%20Parallelized%20Encoded%20Chest%20Hall%20Using%20Discs/CH02_Parallelized_Encoded_Chest_Hall_Using_Discs.litematic?raw=1)   | Schematic of device.  |
