cmake_minimum_required(VERSION 3.24)
project(fyp_repos C CXX)

set(CMAKE_C_STANDARD 11)

include_directories(.)

add_executable(fyp_repos
        GraphGenerator.h GraphGenerator.cpp Pathfinding.cpp Pathfinding.h)
