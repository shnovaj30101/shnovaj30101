#include<iostream>
#include<sstream>
#include<string>
#include<stdio.h>

using namespace std;

int main(int argc,char** argv) {
    stringstream ss;
    ss << argv[1];
    int iter;
    ss >> iter;
    ss.str("");
    ss.clear();
    string arg(argv[1]);
    string name="./modellist/modellist_"+arg+".txt";
    FILE *fp=fopen(name.c_str(),"w");
    for (int i=1 ; i<=5 ; i++) {
        fprintf(fp,"./model/model_0%d_%d.txt\n",i,iter);
    }
}
