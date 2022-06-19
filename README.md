# CRCLIB - Lib for calculate CRC

Данная библеотека позволяет вам рассчитать контрольную сумму для таких ключей как: Dallas, ТехКом (включая ТК17), КТ-01, Mifare (включая алгоритм расчета с 3 байтами), Urmet.

### Список методов:
```js
texkom(<ByteArray>) // Контрольная сумма ТехКом (ТК-13, ТК-15)
kt01(<ByteArray>) // Контрольная сумма КТ-01
dallas(<ByteArray>) // Контрольная сумма Dallas
tk17(<ByteArray>) // Контрольная сумма ТехКом ТК-17
mifare(<ByteArray>) // Контрольная сумма Mifare (4 байта)
mifare3(<ByteArray>) // Контрольная сумма Mifare (3 байта)
urmet(<ByteArray>) // Контрольная сумма Urmet
fixHid37(<ByteArray>) // Фикс неправильного кода для HID37
fixPAC(<ByteArray>) // Фикс неправильного кода для PAC
fixMetakomByte(<Byte>) // Фикс кода в соотвествии с документацией чипа 1233КТ2

test() // Проверка всех алгоритмов
```
Пример:
```js
var crclib = require("crclib")

var crc = new crclib()

console.log(`ТехКом: ` + this.texkom([0x00, 0x32, 0x32, 0x44, 0x55, 0x63, 0xFF, 0xFF]) ) // -> 5A
console.log(`КТ-01: ` + this.kt01([0x00, 0x12, 0x34, 0x56, 0x78, 0x90, 0x12, 0x34]) ) // -> 44
console.log(`Dallas: ` + this.dallas([0x00, 0x00, 0x00, 0xFF, 0xFF, 0xFF, 0xFF, 0x01]) ) // -> 9B
console.log(`ТехКом ТК-17: ` + this.tk17([0x00, 0x32, 0x32, 0x44, 0x55, 0xCA, 0xFF, 0xFF]) ) // -> 48
console.log(`Mifare: ` + this.mifare([0xAA, 0xBB, 0xCD, 0xEF]) ) // -> 33
console.log(`Mifare: ` + this.mifare3([0xAA, 0xBB, 0xCC]) ) // -> 55
console.log(`Urmet: ` + this.urmet([0xF2, 0x00, 0x00, 0x98, 0x76, 0x54, 0x32])) // -> D2
console.log(`METAKOM: 9AD1E1` + this.fixMetakomByte(0x9AD1E1D0)) // -> 9AD1E1D1
```

Если нашли ошибку или у вас есть вопросы пожалуйста напишите [мне](https://vk.com/li0ard)

# For foreigners

### Sorry, I'm lazy and English docs is not ready
