#include <algorithm>
#include <bitset>
#include <cstdlib>
#include <ctime>
#include <iostream>
#include <iterator>
#include <random>
#include <string>
#include <vector>

#define PAGE_TABLE_MAX 0b111
#define PAGE_TABLE_MIN 0b000
#define PAGE_TABLE_SIZE ((PAGE_TABLE_MAX - PAGE_TABLE_MIN) + 1)

#define FRAME_NUMBER_MAX 0b111
#define FRAME_NUMBER_MIN 0b000

#define TLB_SIZE 4

using namespace std;

/// Convert binary string to decimal integer
int bin_str_to_dec(string bin) { return stoi(bin, 0, 2); }

/**
 * @brief Update TLB table
 *
 * @param[out] tlb_table TLB table needs to be updated
 * @param[in] page_number Page number that the TLB table needs to add
 * @param[in] frame_number Frame number that the TLB table needs to add
 */
void update_tlb(vector<pair<int, int>>& tlb_table, int page_number,
                int frame_number) {
    // Remove oldest entry when tlb_table is full
    if (tlb_table.size() == TLB_SIZE)
        tlb_table.erase(tlb_table.begin());

    tlb_table.push_back(make_pair(page_number, frame_number));
}

/// Generate random frame_number for page table
vector<int> generate_random_page_table(int from, int to) {
    vector<int> values;
    for (auto i = from; i <= to; i++)
        values.push_back(i);

    auto rnd = default_random_engine();
    shuffle(begin(values), end(values), rnd);

    return values;
}

int main(void) {
    // Init random seed for random values in page table
    srand(time(0));

    // Init page table with random values
    auto page_table
        = generate_random_page_table(FRAME_NUMBER_MIN, FRAME_NUMBER_MAX);

    // Display initialed page table
    cout << "Page table (page, frame number): ";
    for (auto i = 0; i < PAGE_TABLE_SIZE; i++)
        cout << "(" << i << ", 0b" << bitset<3>(page_table[i]) << ") ";

    cout << endl;

    // Init TLB table
    vector<pair<int, int>> tlb_table;

    // Init logicalAddress to store input logical address value
    string logical_address;

    while (true) {
        cout << "Enter logical address in binary (8bits): ";
        cin >> logical_address;

        // Convert binary to integers
        auto page_number = bin_str_to_dec(logical_address.substr(0, 3));
        auto offset = bin_str_to_dec(logical_address.substr(3, 5));

        // Check TLB table for the page number
        auto tlb_entry = find_if(tlb_table.begin(), tlb_table.end(),
                                 [page_number](const pair<int, int>& entry) {
                                     return entry.first == page_number;
                                 });

        if (tlb_entry != tlb_table.end()) {
            // TLB hit
            auto frame_number = tlb_entry->second;
            auto physical_address = (frame_number << 5) | offset;
            cout << "Physical address (TLB hit): "
                 << bitset<8>(physical_address) << endl;
        } else {
            // TLB miss, search frame_number in page_table and update tlb_table
            auto frame_number = page_table[page_number];
            auto physical_address = (frame_number << 5) | offset;
            cout << "Physical address (TLB miss): "
                 << bitset<8>(physical_address) << endl;

            // Update tlb table
            update_tlb(tlb_table, page_number, frame_number);

            // Display tlb table after update
            cout << "TLB Table (page, frame number): ";
            for (const auto& entry : tlb_table)
                cout << "(" << entry.first << ", 0b" << bitset<3>(entry.second)
                     << ") ";
            cout << endl;
        }
    }

    return 0;
}
