//
//  WheelSectorModel.swift
//  Spinner
//
//  Created by Ann Ubaka on 3/13/24.
//

import SwiftUI

struct PieSegment: Identifiable {
    let id: String
    let color: Color
    let label: String
    
    init(id: String = UUID().uuidString, color: Color, label: String) {
        self.id = id
        self.color = color
        self.label = label
    }
}
