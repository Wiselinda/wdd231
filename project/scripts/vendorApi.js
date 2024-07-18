export async function fetchVendorData() {
    const vendorDataUrl = 'https://mytweetmark-homecook.p.rapidapi.com/market?marketId=22'; // Replace with your actual API endpoint
    try {
        const response = await fetch(vendorDataUrl, {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': 'c2480d32d9msh651d3c23a0cb23ep1d267bjsn4bfd6cbe79a8',
                'X-RapidAPI-Host': 'mytweetmark-homecook.p.rapidapi.com'
            }
        });
        if (!response.ok) {
            throw new Error('Network response was not ok.');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching vendor data:', error);
    }
}
