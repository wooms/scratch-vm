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

    static intToByte (int) {
        const intToByteData = new Uint8Array(2);
        intToByteData[0] = (int >> 8) & 0xff; // 상위 바이트
        intToByteData[1] = int & 0xff; // 하위 바이트
        return intToByteData;
    }
}

module.exports = GCubeProtocol;
