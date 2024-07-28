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
