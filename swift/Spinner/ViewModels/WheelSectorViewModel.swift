//  PieViewModel.swift
//  Spinner
//
//  Created by Ann Ubaka on 3/12/24.
//

import SwiftUI

// ViewModel to manage data for the wheel sectors
class WheelSectorViewModel: ObservableObject {
    @Published var segments: [PieSegment] = [] // Array to hold segment colors and corresponding labels
    @Published var winner: String? = nil // Variable to hold the winner label

    // Struct to define a Pie Segment
    struct PieSegment {
        let color: Color
        let label: String
    }

    // Initialize with default data
    init() {
        getItems()
    }

    // Initialize with a string and random color
    init(label: String) {
        let previousColor = segments.last?.color
        self.segments.append(PieSegment(color: randomColor(previousColor: previousColor), label: label))
    }

    // Function to add an item
    func addItem(label: String) {
        let previousColor = segments.last?.color
        segments.append(PieSegment(color: randomColor(previousColor: previousColor), label: label)) // Generate a random color for the segment and add it to the ViewModel
    }

    // Function to delete an item
    func deleteItem(indexSet: IndexSet) {
        segments.remove(atOffsets: indexSet)
    }

    // Function to get initial items
    func getItems() {
        // Create the new items to start with
        let newItems: [PieSegment] = []
        
        // Append them to an array. In this case, they're being appended to segments
        segments.append(contentsOf: newItems)
    }

    // Function to generate a random color that is different from the previous segment
    func randomColor(previousColor: Color?) -> Color {
        // Define an array of baby/pastel girly cutesy colors
        let pastelColors: [Color] = [
            Color(red: 255/255, green: 204/255, blue: 204/255), // Baby Pink
            Color(red: 255/255, green: 229/255, blue: 204/255), // Baby Peach
            Color(red: 204/255, green: 255/255, blue: 204/255), // Baby Mint
            Color(red: 204/255, green: 229/255, blue: 255/255), // Baby Blue
            Color(red: 255/255, green: 204/255, blue: 255/255), // Baby Lavender
            Color(red: 255/255, green: 255/255, blue: 204/255), // Baby Yellow
            Color(red: 255/255, green: 204/255, blue: 229/255), // Baby Coral
            Color(red: 204/255, green: 204/255, blue: 255/255), // Baby Lilac
            Color(red: 255/255, green: 229/255, blue: 255/255), // Baby Blush
            Color(red: 204/255, green: 255/255, blue: 255/255)  // Baby Aqua
        ]
        
        // Filter out the previous color if it exists
        let availableColors = pastelColors.filter { $0 != previousColor }
        
        // Generate a random index to select a color from the available colors
        let randomIndex = Int.random(in: 0..<availableColors.count)
        
        // Return the randomly selected color
        return availableColors[randomIndex]
    }
}
