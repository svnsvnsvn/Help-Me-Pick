//
//  itemView.swift
//  Spinner
//
//  Created by Ann Ubaka on 3/13/24.
//

import SwiftUI

<<<<<<< HEAD
struct InputListRowView: View {
=======
struct InputListView: View {
>>>>>>> bea3a5716fb12718822d1acbfdee91fe42082dae
    
    let item: PieSegment
    
    var body: some View {
        HStack{
            Image(systemName: "heart")
                .foregroundColor(.red)
                .padding(6)
            Text(item.label)
            Spacer()
        }
        .font(.title3)
        .fontDesign(.serif)
        .padding(.vertical, 3)
    }
}

<<<<<<< HEAD
struct InputListRowView_Previews: PreviewProvider {
=======
struct InputListView_Previews: PreviewProvider {
>>>>>>> bea3a5716fb12718822d1acbfdee91fe42082dae
    static var item1 = PieSegment(color: .blue, label: "This is a choice")
    
    static var previews: some View
    {
       
<<<<<<< HEAD
        InputListRowView(item: item1)
=======
        InputListView(item: item1)
>>>>>>> bea3a5716fb12718822d1acbfdee91fe42082dae

    }
}
