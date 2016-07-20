#include<iostream>
#include<stdio.h>
#include<fstream>
#include<string>
#include"hmm.h"

using namespace std;

int convert(char obs) {
    return int(obs)-'A';
}
int main(int argc,char** argv) {
    HMM hmm[5];
    char line[200];
    ifstream testdata;
    testdata.open(argv[2],ios::in);
    load_models(argv[1],hmm,5);
    FILE *fp=fopen(argv[3],"w");
    int state_num=hmm[0].state_num;
    //dump_models(hmm,5);
    //dumpHMM(stderr,&hmm[0]);
    while (testdata.getline(line,sizeof(line),'\n')) {
        int len=strlen(line);
        long double max_prob[5];
        for (int i=0 ; i<5 ; i++) {
            long double delta[len][state_num]={};
            for (int j=0 ; j<len ; j++) {
                if (j==0) 
                   for (int k=0 ; k<state_num ; k++) {
                       delta[j][k]=hmm[i].initial[k]*hmm[i].observation[convert(line[j])][k];
                   }
                else {
                   for (int k=0 ; k<state_num ; k++) {
                       long double max=0;
                       for (int m=0 ; m<state_num ; m++) {
                           if (max<delta[j-1][m]*hmm[i].transition[m][k])
                              max=delta[j-1][m]*hmm[i].transition[m][k];
                       }
                       delta[j][k]=max*hmm[i].observation[convert(line[j])][k];
                   }
                }
            }
            long double max=0;
            for (int j=0 ; j<state_num ; j++) {
                if (max<delta[len-1][j]) {
                   max=delta[len-1][j]; 
                } 
            }
            max_prob[i]=max;    
        }
        long double max=0;
        int best_model=0;
        for (int i=0 ; i<5 ; i++) {
            if (max<max_prob[i]) {
               max=max_prob[i]; 
               best_model=i+1;
            }
        } 
        /*for (int i=0 ; i<5 ; i++) {
            cout<<max_prob[i]<<endl;
        }*/
        //cout<<max<<endl;
        //printf("%Le\n",max);
        //fgetc(stdin);
        fprintf(fp,"model_0%d.txt %Le\n",best_model,max);
    }testdata.close();
}
