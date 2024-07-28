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
    
   struct PieSegment {
       let color: Color
       let label: String
   }
   
    func addItem(label: String) {
        
        let previousColor = segments.last?.color
        segments.append(PieSegment(color: randomColor(previousColor: previousColor), label: label)) // Generate a random color for the segment and add it to the ViewModel
    }
 
}
