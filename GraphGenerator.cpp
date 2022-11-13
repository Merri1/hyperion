//
// Created by merri on 13/11/22.
//
#include "GraphGenerator.h"
#include <iostream>

using namespace std;

int main (){
    Pathfinding *pf = new Pathfinding();
    GraphGenerator *gg = new GraphGenerator();

    gg->PrintSummary();
}

void GraphGenerator::PrintSummary() {
    cout << "This is the graph generator class" << endl;
    pf.PrintSummary();
}