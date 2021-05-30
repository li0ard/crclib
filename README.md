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

test() // Проверка всех алгоритмов
```
Пример:
```js
var crclib = require("crclib")

var crc = new crclib()

console.log(crc.mifare([0xAA, 0xBB, 0xCD, 0xEF])) // -> 33
```

Если нашли ошибку или у вас есть вопросы пожалуйста напишите [мне](https://vk.com/li0ard)

# For foreigners

### Go out, it's lib only for russians :D