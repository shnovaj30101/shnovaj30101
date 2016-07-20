#include<iostream>
#include<stdio.h>
#include<cstring>
#include<fstream>
#include<iomanip>
#include<sstream>
#include"hmm.h"
using namespace std;

#define SIZE 100
char line[SIZE];

int convert(char);
void write_model();

int main(int argc , char** argv){
	ifstream file;
	char line[200];
	HMM hmm;
    stringstream ss;
    string s(argv[1]);
    ss << s;
    int iter;
    ss >> iter;
    ss.str("");
    ss.clear();
	loadHMM(&hmm,argv[2]);
    FILE *fp=fopen(argv[4],"w");
    //dumpHMM(stderr,&hmm);	

    for (int it=0 ; it<iter ; it++) { 
	file.open(argv[3],ios::in);
    double all_observation_n[6][6]={};
    double all_observation_d[6][6]={};
    double all_initial[6]={};
    double all_transition_n[6][6]={};
    double all_transition_d[6]={};
    int test_num=0;

    double alpha[MAX_SEQ][6],beta[MAX_SEQ][6],gama[MAX_SEQ][6];
    double ksi[MAX_SEQ][6][6];
    
	while (file.getline(line,sizeof(line),'\n'))			
	{
		int T=strlen(line); //cout<<T<<endl;
		if (!(T>0)) break;
		else test_num++;
        
        //compute alpha
		for(int count_1=0;count_1<T;count_1++) {
			for(int count_2=0;count_2<6;count_2++)
			{
				if (count_1==0)
					alpha[0][count_2]=hmm.initial[count_2]*hmm.observation[convert(line[0])][count_2];
                    //α0(i) = pi(i)*bi(o0)
				else {
					double N=0;//αt+1(j) = ∑i=1~N[ αt(i) × aij ] × bj(ot+1)  
					for (int k=0;k<6;k++)
					{
						N+=alpha[count_1-1][k]*hmm.transition[k][count_2];
					}

					alpha[count_1][count_2] = N*hmm.observation[convert(line[count_1])][count_2];
				}
			}
        }
        //compute alpha end



		/*cout<<"\nalpha:\n";
		for(int count_1=0;count_1<T;count_1++) {
			for(int count_2=0;count_2<6;count_2++) {
				cout<<alpha[count_1][count_2]<<" ";
			}
			cout<<endl;
		}*/



        //compute beta
		//βT(i) = 1  βt(i) = ∑j=1~N[ aij × bj(ot+1) × βt+1(j) ]
		for(int count_3=T-1;count_3>=0;count_3--)
		{
			for(int count_4=0;count_4<6;count_4++)
			{
				double L=0;
				if (count_3==T-1)//t=count_3 i=count_4
					beta[count_3][count_4]=1;
				else {
					for (int l=0;l<6;l++) { //j=l
					    L+=hmm.transition[count_4][l]*hmm.observation[convert(line[(count_3+1)])][l]*beta[count_3+1][l];
                    }
				    beta[count_3][count_4]=L;
                }
			}
		}
        //compute beta end

		/*cout<<"\nbeta:\n";
                for(int count_1=0;count_1<T;count_1++) {

			for(int count_2=0;count_2<6;count_2++) {
				cout<<beta[count_1][count_2]<<" ";
			}
			cout<<endl;
		}*/


        //compute gamma 
		for(int count_5=0;count_5<T;count_5++)// γt(i) =αt(i) × βt(i)/ ∑j=1~N ksit(i,j)=∑i=1~N [ αt(i) × βt(i) ]
		{
			double G=0;
			for (int g=0;g<6;g++){
				G+=alpha[count_5][g]*beta[count_5][g];
			}
			//cout<<G<<endl;
			for (int i=0 ; i<6 ; i++) {
				if(G == 0) {
                    //cout<<"yes\n";        
                	gama[count_5][i] = pow(10, -100);
					continue;
				}
				gama[count_5][i]=alpha[count_5][i]*beta[count_5][i]/G;
            
			}
		}
        //compute gamma end


        /*for(int count_1=0;count_1<T;count_1++) {
			for(int count_2=0;count_2<6;count_2++) {
				cout<<gama[count_1][count_2]<<" ";
			}
			cout<<endl;
		}*/

        //compute ksi
		for(int count_6=0;count_6<T-1;count_6++)
		{
			double K=0;
			for(int i=0;i<6;i++)
			{
				for(int j=0;j<6;j++)
				{
					K+=alpha[count_6][i]*hmm.transition[i][j]
						*hmm.observation[convert(line[(count_6+1)])][j]
						*beta[count_6+1][j];
				}
			}
			//cout<<K<<endl;
			for(int i=0;i<6;i++)
			{
				for(int j=0;j<6;j++)
				{
					if(K == 0) {
                				ksi[count_6][i][j] = pow(10, -100);
						continue;
					}
					ksi[count_6][i][j]=alpha[count_6][i]*hmm.transition[i][j]
						*hmm.observation[convert(line[(count_6+1)])][j]
						*beta[count_6+1][j]/K;
				}
			}
		}
        //compute ksi end

		for (int i=0 ; i<6 ; i++) {
			
			all_initial[i]+=gama[0][i];
		}
		for (int i=0 ; i<6 ; i++) {
			double G=0;
			for (int j=0 ; j<6 ; j++) {
				double K=0;
				for (int t=0 ; t<T-1 ;t++) {
					K+=ksi[t][i][j];
				}
				for (int t=0 ; t<T ;t++) {
					G+=ksi[t][i][j];
				}
				all_transition_n[i][j]+=K;
			}
			
				
			all_transition_d[i]+=G;
		}
		for (int j=0 ; j<6 ; j++) {
			for (int k=0 ; k<6 ; k++) {
				double G1=0,G2=0;
				for (int t=0 ; t<T ; t++) {
					if (convert(line[t])==k)
						G1+=gama[t][j];
						
					G2+=gama[t][j];
				}
				
				all_observation_n[k][j]+=G1;

				
				all_observation_d[k][j]+=G2;
			}
		}
	}
	
	for(int i = 0; i < 6; i++)
        hmm.initial[i] = all_initial[i] / test_num; 

        //update transition
    for(int i = 0; i < 6; i++){
        for(int j = 0; j < 6; j++)
            hmm.transition[i][j] = all_transition_n[i][j] / all_transition_d[i];
    }

    //update observation
    for(int k = 0; k < 6; k++) {
        for(int j = 0; j < 6; j++)
            hmm.observation[k][j] = all_observation_n[k][j] / all_observation_d[k][j];
    }file.close();} //end while end for	
    
    //dumpHMM(stderr,&hmm);
    dumpHMM(fp,&hmm);
	return 0;
}

int convert(char obs)
{
	return (int)obs-'A';
}


