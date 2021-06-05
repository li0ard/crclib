class crclib {
	constructor() {
		this._name_ = `CRCLib`
		this._version_ = "v1.0.1"
		this._author_ = "li0ard"
	}
	test() {
		console.log(`ТехКом (32:32:44:55:63:FF:FF): ` + this.texkom([0x00, 0x32, 0x32, 0x44, 0x55, 0x63, 0xFF, 0xFF]) )
		console.log(`КТ-01 (12:34:56:78:90:12:34): ` + this.kt01([0x00, 0x12, 0x34, 0x56, 0x78, 0x90, 0x12, 0x34]) )
		console.log(`Dallas (00:00:FF:FF:FF:FF:01):` + this.dallas([0x00, 0x00, 0x00, 0xFF, 0xFF, 0xFF, 0xFF, 0x01]) )
		console.log(`ТехКом ТК-17 (32:32:44:55:CA:FF:FF): ` + this.tk17([0x00, 0x32, 0x32, 0x44, 0x55, 0xCA, 0xFF, 0xFF]) )
		console.log(`Mifare (AA:BB:CD:EF): ` + this.mifare([0xAA, 0xBB, 0xCD, 0xEF]) )
		console.log(`Mifare 3 байта (AA:BB:CC): ` + this.mifare3([0xAA, 0xBB, 0xCC]) )
		console.log(`HID37 (56:5A:11:40:BE): ` + this.fixHid37([0x56, 0x5A, 0x11, 0x40, 0xBE]) )
		console.log(`Urmet (F2:00:00:98:76:54:32): ` + this.urmet([0xF2, 0x00, 0x00, 0x98, 0x76, 0x54, 0x32]))
		console.log(`PAC: ` + this.fixPAC([0x12, 0x21, 0xAA, 0xBB, 0xCC, 0xDD, 0xEE, 0xFF, 0x12, 0x34, 0x56, 0x78, 0x90, 0x00, 0x00, 0x00]))
		console.log(`METAKOM: 9AD1E1` + this.fixMetakomByte(0x9AD1E1D0))
	}
	texkom(arrby) {
		var n = 4;
		var arrby2 = []
		if (arrby.length < 8) {
			return "FF";
		}
		var n2 = 0;
		var n3 = 4;
		while (n2 < n) {
			arrby2[n2] = arrby[n3];
			++n2;
			--n3;
		}
		var n4 = 0;
		var n5 = 0;
		do {
			var by = (n - 1);
			if (n <= 0) break;
			var n6 = n4 ^ 255 & arrby2[n5];
			n5 = (n5 + 1);
			var n7 = n6;
			for (var n8 = 0; n8 < 8; n8 = Number((n8 + 1))) {
				if ((n7 & 128) > 0) {
					n7 = 49 ^ n7 << 1;
					continue;
				}
				n7 <<= 1;
			}
			n4 = n7;
			n = by;
		} while (true);
		return (255 & (n4 & -2)).toString(16).toUpperCase();
	}
	kt01(arrby) {
		var arrby2 = []
		if (arrby.length < 8) {
			return "FF";
		}
		var n = 0;
		var n2 = 7;
		while (n < 7) {
			arrby2[n] = arrby[n2];
			++n;
			--n2;
		}
		var n3 = 0;
		var n4 = 0;
		do {
			var n5 = 255 & arrby2[n3];
			var n6 = n4;
			for (var n7 = 0; n7 < 8; n7 = Number((n7 + 1))) {
				var n8 = 1 & (255 & (n6 ^ n5));
				n6 = 255 & n6 >> 1;
				n5 = 255 & n5 >> 1;
				if (n8 != 1) continue;
				n6 ^= 87;
			}
 			if ((n3 = Number((n3 + 1))) >= 7) {
				return n6.toString(16).toUpperCase();
			}
			n4 = n6;
		} while (true);
	}
	dallas (arrby) {
		var arrby2 = [];
		if (arrby.length < 8) {
			return "FF";
		}
		var n = 0;
		var n2 = 7;
		while (n < 7){
			arrby2[n] = arrby[n2];
			++n;
			--n2;
		}
		var n3 = 0;
		var n4 = 0;
		do {
			var n5 = 255 & arrby2[n3];
			var n6 = n4;
			for (var n7 = 0; n7 < 8; n7 = Number(n7 + 1)) {
				var n8 = 1 & (255 & (n6 ^ n5));
				n6 = 255 & n6 >> 1;
				n5 = 255 & n5 >> 1;
				if (n8 != 1) continue;
				n6 ^= 140;
			}
			if ((n3 = Number(n3 + 1)) >= 7) {
				return n6.toString(16).toUpperCase();
			}
			n4 = n6;
		} while (true);
	}
	tk17(arrby) {
		if(arrby.length < 8) {
			return "FF"
		}
		return this.dallas( [0x00, arrby[1], arrby[2], arrby[3], arrby[4], 0x00, 0x00, 0x00] )
	}
	mifare(arrby) {
		if (arrby.length == 4) {
            var by = arrby[0];
            var by2 = arrby[1];
            var by3 = arrby[2];
            return (arrby[3] ^ (by ^ by2 ^ by3)).toString(16).toUpperCase();
        } else {
        	return "FF"
        }
	}
	mifare3(arrby) {
		var BCC = 0x88
		if (arrby.length == 3) {
            var by = BCC;
            var by2 = arrby[0];
            var by3 = arrby[1];
            return (arrby[2] ^ (by ^ by2 ^ by3)).toString(16).toUpperCase();
        } else {
        	return "FF"
        }
	}
	fixHid37(arrby) {
		if(arrby.length < 5) return [0x00, 0x00, 0x00, 0x00, 0x00];
		if(parseInt(arrby[0].toString(),16) > 7) {
			arrby[0] = 0x07
		}
		for(var i = 0; i<arrby.length; i++) {
			arrby[i] = arrby[i].toString(16).toUpperCase()
		}
		return arrby
	}
	urmet(arrby) {
		var value = 90;
		for (var i = 3; i < 7; ++i) {
			value ^= arrby[i];
			for (var j = 0; j < 8; ++j) {
				var n = value;
				value = (n & 128) > 0 ? n << 1 ^ 1 : n << 1;
			}
		}
	
		value = value.toString(16).toUpperCase()
		return `${value[6]}${value[7]}`
	}
	fixPAC(arrby) {
		if(arrby.length == 16) {
			arrby[0] = 0x00;
			if(parseInt(arrby[1].toString(),16) != 1) {
				arrby[1] = 0x01
			}
			for(var i = 0; i<arrby.length; i++) {
				arrby[i] = arrby[i].toString(16).toUpperCase()
			}
			return arrby
		}
		else {
			return [0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]
		}
	}
	fixMetakomByte(by) {
        var n = by & 255;
        by = n;
        var n2 = 0;
        for (var i = 0; i < 8; ++i) {
            var n3 = n2;
            if ((by & 1) != 0) {
                n3 = n2 + 1;
            }
            by = by >> 1;
            n2 = n3;
        }
        by = n;
        if (n2 % 2 != 0) {
            by = (n & 1) == 0 ? (n | 1) : (n & 254);
        }
        return by.toString(16).toUpperCase();
    }
}

module.exports = crclib
