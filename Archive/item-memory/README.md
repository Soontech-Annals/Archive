# item-memory
6 Result(s)

# [1.13; 1.17.1; -] [IM01](IM01%20100%20Item%20RAM): [100 Item RAM](IM01%20100%20Item%20RAM/IM01_100_Item_RAM.pdf)
### *By Andrews54757*

The IM01 is able to store and retrieve items with a specific decimal code. This may be useful as a temp storage in an encoded dynamic sorting system.

<img src="IM01%20100%20Item%20RAM/itemram.png?raw=1" height="300px">

#### Features:
- Has 100 different codes/item types. a dropper of storage per code.
- Random access. Can insert and retrieve items in constant time in any order.
- Half hopperspeed order throughput. Can execute insertions and retrievals every 16 game ticks (exclusive, can't do both at same time).
- Hopperlocked. Can be fully hopperlocked.
- Togglestateless. No piston toggle states.

#### Download Info:
|Identifier   | MC       | File                                                                                                           | Description                    |
|------------ |:-------- |:-------------------------------------------------------------------------------------------------------------- |:-------------------------------|
|IM01         | 1.17.1   | [IM01_100_item_memory_1.17.1.litematic](IM01%20100%20Item%20RAM/IM01_100_item_memory_1.17.1.litematic?raw=1)   | Litematic of item RAM device.  |



# [1.13; 1.17.1; -] [IM02](IM02%201000%20Item%20RAM): [1000 Item RAM](IM02%201000%20Item%20RAM/IM02_1000_Item_RAM.pdf)
### *By Andrews54757*

The IM02 is able to store and retrieve items with a specific decimal code. This may be useful as a temp storage in an encoded dynamic sorting system.

<img src="IM02%201000%20Item%20RAM/ram2.png?raw=1" height="300px">

#### Features:
- Has 1000 different codes/item types. a dropper of storage per code.
- Random access. Can insert and retrieve items in constant time in any order.
- Half hopperspeed order throughput. Can execute insertions and retrievals every 16 game ticks (exclusive, can't do both at same time).
- Hopperlocked. Is fully hopperlocked.
- Togglestateless. No piston toggle states.

#### Download Info:
|Identifier   | MC       | File                                                                                                | Description                    |
|------------ |:-------- |:--------------------------------------------------------------------------------------------------- |:-------------------------------|
|IM02         | 1.17.1   | [IM02_1000_item_RAM_p2.litematic](IM02%201000%20Item%20RAM/IM02_1000_item_RAM_p2.litematic?raw=1)   | Litematic of item RAM device.  |



# [1.16; 1.17.1; -] [IM03](IM03%20Compact%20Disk%20Drive%20Temp%20Storage): [Compact Disk Drive Temp Storage](IM03%20Compact%20Disk%20Drive%20Temp%20Storage/IM03_Compact_Disk_Drive_Temp_Storage.pdf)
### *By Obi, Crain, PallaPalla, xXOpticNerveXx, & JayRoi*

The IM03 Compact Disk Drive Temp Storage is a device that stores boxes in a temporary storage system. The device is designed to be used in a dynamic sorting system to merge partial boxes. To use, set an 8 bit address and input a box. The drive will iterate through the boxes in the right chest to find a box already stored in the system. If a box is found, both boxes are outputted. If no box is found, the input box is stored in the drive for later pairing. The drive can store up to 256 boxes (one per address) in 8 double chests. [Youtube video](https://www.youtube.com/watch?v=_OpecWSo2yc)

<img src="IM03%20Compact%20Disk%20Drive%20Temp%20Storage/diskdrive.png?raw=1" height="300px">

#### Features:
- Stores 32 boxes in each double chest for high density
- 8 bit address, up to 256 boxes
- Built in isBox check for easy pair detection
- Safety feature checks if chest is reset properly
- Safety feature checks if placeholder items are missing

#### Download Info:
|Identifier   | MC       | File                                                                                                                                                    | Description                                 |
|------------ |:-------- |:------------------------------------------------------------------------------------------------------------------------------------------------------- |:--------------------------------------------|
|IM03         | 1.17.1   | [IM03_Compact_Disk_Drive_Temp_Storage.zip](IM03%20Compact%20Disk%20Drive%20Temp%20Storage/IM03_Compact_Disk_Drive_Temp_Storage.zip?raw=1)               | World download of device.                   |
|IM03         | 1.17.1   | [IM03_Compact_Disk_Drive_Temp_Storage.litematic](IM03%20Compact%20Disk%20Drive%20Temp%20Storage/IM03_Compact_Disk_Drive_Temp_Storage.litematic?raw=1)   | Schematic of device. Inventories included.  |



# [1.13; 1.19.3; -] [IM04](IM04%20Compact%201000%20Item%20RAM): [Compact 1000 Item RAM](IM04%20Compact%201000%20Item%20RAM/IM04_Compact_1000_Item_RAM.pdf)
### *By Andrews54757*

The IM04 is able to store and retrieve items with a specific decimal code. This may be useful as a temp storage in an encoded dynamic sorting system.

<img src="IM04%20Compact%201000%20Item%20RAM/imageassa.png?raw=1" height="300px">

#### Features:
- Has 1000 different codes/item types. a dropper of storage per code.
- Random access. Can insert and retrieve items in constant time in any order.
- Compact. Each address is packed into a 1x1 area.
- 46gt latency from call request to item.
- Fully hopperlocked.

#### Download Info:
|Identifier   | MC       | File                                                                                                                    | Description           |
|------------ |:-------- |:----------------------------------------------------------------------------------------------------------------------- |:----------------------|
|IM04         | 1.19.3   | [IM04_Compact_1000_Item_RAM.litematic](IM04%20Compact%201000%20Item%20RAM/IM04_Compact_1000_Item_RAM.litematic?raw=1)   | Schematic of device.  |



# [1.17; 1.19.3; -] [IM05](IM05%201000%20Non-Box%20Item%20RAM): [1000 Non-Box Item RAM](IM05%201000%20Non-Box%20Item%20RAM/IM05_1000_Non-Box_Item_RAM.pdf)
### *By Andrews54757*

The IM05 is able to store and retrieve non-box items with a specific decimal code. This may be useful for implementing dictionaries in an encoded dynamic sorting system. The device uses a 50-address item memory system with a hoppercart based slot cycling system to store and retrieve 1000 different items at near constant time.

<img src="IM05%201000%20Non-Box%20Item%20RAM/image_1%20(1).png?raw=1" height="300px">

#### Features:
- Has 1000 different codes/item types. Items are stored in slots inside shulker boxes inside a dropper.
- Random access. Can insert and retrieve items in constant time in any order.
- Compact. 22x10x19 volume.
- Maximum 55gt latency from call request to item.

#### Download Info:
|Identifier   | MC       | File                                                                                                                    | Description                                        |
|------------ |:-------- |:----------------------------------------------------------------------------------------------------------------------- |:---------------------------------------------------|
|IM05         | 1.19.3   | [IM05_1000_Non-Box_Item_RAM.litematic](IM05%201000%20Non-Box%20Item%20RAM/IM05_1000_Non-Box_Item_RAM.litematic?raw=1)   | Schematic of device. Includes dummy item storage.  |



# [1.17; 1.19.3; -] [IM06](IM06%208bit%20Disk%20Drive%20Temp%20Storage): [8bit Disk Drive Temp Storage](IM06%208bit%20Disk%20Drive%20Temp%20Storage/IM06_8bit_Disk_Drive_Temp_Storage.pdf)
### *By disharmonica_*

The IM06 can temporarily store and retrieve boxes with a binary code. Intended for keeping the leftover partials of bulk items, for future merging operations. 256 different types can be held by this device.

<img src="IM06%208bit%20Disk%20Drive%20Temp%20Storage/area_render_35_.png?raw=1" height="300px">

#### Features:
- Extremely compact, 13x9x7 lwh
- Very accessible inputs, output into waterstream, perfect for plumbing
- Has simple temp logic that gives out both boxes, if another one was in storage already
- Uses water buckets as placeholders, turns them into buckets to store very compact when not needed
- Quick cycle and reset, min.102gt - max.598gt = 17.5 seconds on average per request
- Only uses 21 hoppers, wiring for hopperlocking included

#### Download Info:
|Identifier   | MC       | File                                                                                                                                           | Description           |
|------------ |:-------- |:---------------------------------------------------------------------------------------------------------------------------------------------- |:----------------------|
|IM06         | 1.20.1   | [IM06_8bit_Disk_Drive_Temp_Storage.litematic](IM06%208bit%20Disk%20Drive%20Temp%20Storage/IM06_8bit_Disk_Drive_Temp_Storage.litematic?raw=1)   | Schematic of device.  |
