//
// Created by merri on 13/11/22.
//

#ifndef GRAPHGENERATOR_H
#define GRAPHGENERATOR_H

#include "Pathfinding.h"

class GraphGenerator {
public:
    void PrintSummary();
protected:
    Pathfinding pf;
    GraphGenerator *gg;
};
#endif
