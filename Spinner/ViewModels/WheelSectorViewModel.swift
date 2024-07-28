//
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
    
<<<<<<< HEAD
    //initialize with set data
    init() {
        getItems()
    }
    
    //initialize w a string and random color
    init(label: String){
        let previousColor = segments.last?.color
        self.segments.append(PieSegment(color: randomColor(previousColor: previousColor), label: label))
    }
    
    func addItem(label: String) {
        let previousColor = segments.last?.color
        segments.append(PieSegment(color: randomColor(previousColor: previousColor), label: label)) // Generate a random color for the segment and add it to the ViewModel
    }
    
    func deleteItem(indexSet: IndexSet) {
        segments.remove(atOffsets: indexSet)
    }
    
    func getItems() {
        //create the new items to start with
        let newItems: [PieSegment] = []
        
        //append them to an array. in this case, they're being appended to items
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

=======
   struct PieSegment {
       let color: Color
       let label: String
   }
   
    func addItem(label: String) {
        
        let previousColor = segments.last?.color
        segments.append(PieSegment(color: randomColor(previousColor: previousColor), label: label)) // Generate a random color for the segment and add it to the ViewModel
    }
 
>>>>>>> bea3a5716fb12718822d1acbfdee91fe42082dae
}
