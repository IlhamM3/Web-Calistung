const DataHitung = {
    status: true,
    data: [
        {
            id: 1,
            a: 3,
            b: 3,
        },
        {
            id: 2,
            a: 5,
            b: 3,
        },
        {
            id: 3,
            a: 2,
            b: 3,
        },
        {
            id: 4,
            a: 4,
            b: 3,
        },
        {
            id: 5,
            a: 9,
            b: 5,
        },
        {
            id: 6,
            a: 9,
            b: 2,
        },
        {
            id: 7,
            a: 8,
            b: 8,
        },
        {
            id: 8,
            a: 7,
            b: 3,
        },
        {
            id: 9,
            a: 5,
            b: 7,
        },
        {
            id: 10,
            a: 3,
            b: 5,
        }
    ]
};

// Fungsi untuk menghasilkan data acak
function generateRandomData() {
    const newData = [];
    const existingIds = new Set(DataHitung.data.map(item => item.id));

    for (let i = 1; i <= 20; i++) {
        let randomA = Math.floor(Math.random() * 10) + 1; // Nilai acak untuk a antara 1 hingga 10
        let randomB = Math.floor(Math.random() * 10) + 1; // Nilai acak untuk b antara 1 hingga 10

        // Jika nilai acak sudah ada, maka ambil nilai acak baru hingga unik
        while (existingIds.has(i)) {
            i++;
        }

        newData.push({
            id: i,
            a: randomA,
            b: randomB,
        });
    }

    return newData;
}

// Gabungkan data baru dengan data yang ada
DataHitung.data = DataHitung.data.concat(generateRandomData());

export default DataHitung;
