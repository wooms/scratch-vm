class GCubeProtocol{

    /**
     * - Set Color LED Data
     * @param {number} cubeID
     * - Cube Number
     * @param {number} red
     * - Red
     * @param {number} green
     * - Green
     * @param {number} blue
     * - Blue
     * @returns {Uint8Array}
     * - Data
     */
    static makeColorLEDData (cubeID, red, green, blue) {
        const data = new Uint8Array(14);

        data[0] = 0xff;
        data[1] = 0xff;
        data[2] = 0x00;
        data[3] = cubeID;
        data[4] = 0x00;
        data[5] = 0x00;
        data[6] = 0xce;
        data[7] = 0x00;
        data[8] = 0x0e;
        data[9] = 0x01;
        data[10] = red;
        data[11] = green;
        data[12] = blue;
        data[13] = 0x50;

        return data;
    }

    static getOrangeForSoundData () {
        const data = new Uint8Array(14);

        data[0] = 0xff;
        data[1] = 0xff;
        data[2] = 0x00;
        data[3] = 0x07;
        data[4] = 0x00;
        data[5] = 0x00;
        data[6] = 0xce;
        data[7] = 0x00;
        data[8] = 0x0e;
        data[9] = 0x02;
        data[10] = 0x00;
        data[11] = 0x00;
        data[12] = 0x07;
        data[13] = 0x50;

        return data;
    }

    static makeContinuousData (cubeID, cubeCount, speed) {
        const data = new Uint8Array(15);

        data[0] = 0xff;
        data[1] = 0xff;
        data[2] = 0xff;
        data[3] = cubeID;

        data[4] = cubeCount << 4;
        data[5] = 0x00;

        data[6] = 0xcc;

        data[7] = 0x00;
        data[8] = 0x0f;

        data[9] = 0x01;
        data[10] = 0x00;
        data[11] = 0x00;
        data[12] = 0x02;

        const speedBytes = GCubeProtocol.intToByte(speed);
        data[13] = speedBytes[0];
        data[14] = speedBytes[1];

        return data;
    }

    static makeSingleStep (cubeID, cubeCount, speed, step) {
        const data = new Uint8Array(19);

        data[0] = 0xff;
        data[1] = 0xff;
        data[2] = 0xff;
        data[3] = cubeID;

        data[4] = cubeCount << 4;
        data[5] = 0x00;

        data[6] = 0xc1;

        data[7] = 0x00;
        data[8] = 0x13;

        data[9] = 0x01;
        data[10] = 0x01;
        data[11] = 0x00;
        data[12] = 0x02;

        const speedBytes = GCubeProtocol.intToByte(speed);
        const stepBytes = GCubeProtocol.intToByte(step);
        data[13] = speedBytes[0];
        data[14] = speedBytes[1];
        data[15] = 0x00;
        data[16] = 0x00;
        data[17] = stepBytes[0];
        data[18] = stepBytes[1];
        return data;
    }

    static getSensorsData (Position, Interval) {

        const data = new Uint8Array(11);
    
        data[0] = 0xff;
        data[1] = 0xff;
        data[2] = 0x00;
        data[3] = Position; // cube Index
        data[4] = 0x00;
        data[5] = 0xc8;
        data[6] = 0xb8;
        data[7] = 0x00;
        data[8] = 0x0b;
        data[9] = Interval;
        data[10] = 0x1;
    
        return data;
    }

    static makeMatrixXY (cubeID, cubeCount, x, y, onoff) {

        const data = new Uint8Array(13);

        data[0] = 0xff;
        data[1] = 0xff;
        data[2] = 0xff;
        data[3] = cubeID;

        data[4] = 0x00;
        data[5] = 0xe1;

        data[6] = 0xa2;

        data[7] = 0x00;
        data[8] = 0x0d;

        data[9] = 0x70;

        data[10] = x;
        data[11] = y;
        data[12] = onoff;
    
        return data;
    }

    static makeMatrixPictureData (cubeID, cubeCount, pictureData) {

        const data = new Uint8Array(18);

        data[0] = 0xff;
        data[1] = 0xff;
        data[2] = 0xff;
        data[3] = cubeID;

        data[4] = 0x00;
        data[5] = 0xe2;

        data[6] = 0xa2;

        data[7] = 0x00;
        data[8] = 0x12;

        data[9] = 0x70;

        data[10] = pictureData[0];
        data[11] = pictureData[1];
        data[12] = pictureData[2];
        data[13] = pictureData[3];
        data[14] = pictureData[4];
        data[15] = pictureData[5];
        data[16] = pictureData[6];
        data[17] = pictureData[7];
    
        return data;
    }

    static intToByte (int) {
        const intToByteData = new Uint8Array(2);
        intToByteData[0] = (int >> 8) & 0xff; // 상위 바이트
        intToByteData[1] = int & 0xff; // 하위 바이트
        return intToByteData;
    }

    static byteToStringReceive (event) {
        let hexStr = '';
        const hexSpace = ' ';

        for (let i = 0; i < event.target.value.byteLength; i++) {
            // 각 바이트를 16진수로 변환
            const hex = event.target.value.getUint8(i)
                .toString(16)
                .padStart(2, '0');
            hexStr += hex + hexSpace;
        }
        
        // 공백 제거
        hexStr.trim();
        return hexStr;
    }

    static byteToString (data) {
        let hexStr = '';
        const hexSpace = ' ';

        for (let i = 0; i < data.byteLength; i++) {
            // 각 바이트를 16진수로 변환
            const hex = data[i]
                .toString(16)
                .padStart(2, '0');
            hexStr += hex + hexSpace;
        }
        
        // 공백 제거
        hexStr.trim();
        return hexStr;
    }

}

module.exports = GCubeProtocol;
