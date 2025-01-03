# Soontech Annals Archive

[Join the Discord](https://discord.gg/rJ4W8RHrhe) or [View the Archive](/Archive/)

This is a record of minecraft encoded storage technologies. 

## Naming convention

First two letters indicate category. Next two numbers indicate index (incrementing by 1 with each machine).

| Category                                                | Code |
|---------------------------------------------------------|------|
| [autocrafting](Archive/autocrafting/)                   | AC   |
| [box-variable](Archive/box-variable/)                   | BV   |
| [chest-halls](Archive/chest-halls/)                     | CH   |
| [data-storage](Archive/data-storage/)                   | DS   |
| [decoders](Archive/decoders/)                           | DC   |
| [display-halls](Archive/display-halls/)                 | DH   |
| [encoded-systems](Archive/encoded-systems/)             | ES   |
| [encoders](Archive/encoders/)                           | EC   |
| [everything-bagel](Archive/everything-bagel/)           | MX   |
| [external-bulk](Archive/external-bulk/)                 | EB   |
| [item-memory](Archive/item-memory/)                     | IM   |
| [item-variable](Archive/item-variable/)                 | IV   |
| [logic-and-computation](Archive/logic-and-computation/) | LC   |
| [merging](Archive/merging/)                             | MG   |
| [splitting](Archive/splitting/)                         | SG   |
| [transport](Archive/transport/)                         | TP   |
| [wiring](Archive/wiring/)                               | WI   |

## Folder structure
> `./Archive/[category]/[ID] [Title]/`

Within the `./Archive/` directory, there are folders for each category. Within these folders you will find folders for each entry.

Each entry has a minimum of four items
1. Latex file (.tex) with documentation
2. PDF file (.pdf) generated by latex
3. Image of the build
4. Download file of the build

## Machine readable data

`data.json` is a machine-readable version of the archive. This is automatically generated from the latex files.

## Contributing

The easiest way to contribute will be to join the discord server and make a post there. If you want to help maintain the archives directly, you will need some experience working with Latex.

The latex class file we use is located at `datasheet.cls`. An example datasheet can be found at `exampleDatasheet.tex`.

Please submit additions, deletions, and modifications for review as a pull request.

## Useful Scripts

The `runTasks` script is responsible for:
1. Removing unecessary latex files.
2. Compiling the machine-readable version of the archives.
3. Generating the READMEs within the archives.

To use, you must have NodeJS. First install dependencies (`npm install`), then run via `node runTasks.js`.

### IMPORTANT!

Run the script AFTER you commit any changes to world downloads/schematics files. The script will use the latest commit ID to generate permenent download URLs used in the pdfs.
