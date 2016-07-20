#include<iostream>
#include<fstream>
#include<stdio.h>

using namespace std;

int main(int argc,char** argv) {
    ifstream file1;
    ifstream file2;
    char line1[200];
    char line2[200];
    file1.open(argv[1],ios::in);
    file2.open(argv[2],ios::in);
    FILE* fp=fopen(argv[3],"w");
    double yes=0,no=0;
    while (file1.getline(line1,sizeof(line1),'\n') && file2.getline(line2,sizeof(line2),'\n')) {
         if ((int)line1[7]-(int)line2[7]==0) yes++;
         else no++;
    }
    double ans=yes/(yes+no);
    cout<<ans<<endl;
    fprintf(fp,"%lf",ans);
    file1.close();
    file2.close();
}
