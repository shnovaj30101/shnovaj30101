./train 1 model_init.txt seq_model_01.txt ./model/model_01_1.txt
./train 1 model_init.txt seq_model_02.txt ./model/model_02_1.txt
./train 1 model_init.txt seq_model_03.txt ./model/model_03_1.txt
./train 1 model_init.txt seq_model_04.txt ./model/model_04_1.txt
./train 1 model_init.txt seq_model_05.txt ./model/model_05_1.txt
./construct_modellist 1
./test ./modellist/modellist_1.txt testing_data1.txt ./result1/result1_1.txt 
echo 1
./train 3 model_init.txt seq_model_01.txt ./model/model_01_3.txt
./train 3 model_init.txt seq_model_02.txt ./model/model_02_3.txt
./train 3 model_init.txt seq_model_03.txt ./model/model_03_3.txt
./train 3 model_init.txt seq_model_04.txt ./model/model_04_3.txt
./train 3 model_init.txt seq_model_05.txt ./model/model_05_3.txt
./construct_modellist 3
./test ./modellist/modellist_3.txt testing_data1.txt ./result1/result1_3.txt 
echo 3
./train 5 model_init.txt seq_model_01.txt ./model/model_01_5.txt
./train 5 model_init.txt seq_model_02.txt ./model/model_02_5.txt
./train 5 model_init.txt seq_model_03.txt ./model/model_03_5.txt
./train 5 model_init.txt seq_model_04.txt ./model/model_04_5.txt
./train 5 model_init.txt seq_model_05.txt ./model/model_05_5.txt
./construct_modellist 5
./test ./modellist/modellist_5.txt testing_data1.txt ./result1/result1_5.txt 
echo 5
./train 10 model_init.txt seq_model_01.txt ./model/model_01_10.txt
./train 10 model_init.txt seq_model_02.txt ./model/model_02_10.txt
./train 10 model_init.txt seq_model_03.txt ./model/model_03_10.txt
./train 10 model_init.txt seq_model_04.txt ./model/model_04_10.txt
./train 10 model_init.txt seq_model_05.txt ./model/model_05_10.txt
./construct_modellist 10
./test ./modellist/modellist_10.txt testing_data1.txt ./result1/result1_10.txt 
echo 10
./train 30 model_init.txt seq_model_01.txt ./model/model_01_30.txt
./train 30 model_init.txt seq_model_02.txt ./model/model_02_30.txt
./train 30 model_init.txt seq_model_03.txt ./model/model_03_30.txt
./train 30 model_init.txt seq_model_04.txt ./model/model_04_30.txt
./train 30 model_init.txt seq_model_05.txt ./model/model_05_30.txt
./construct_modellist 30
./test ./modellist/modellist_30.txt testing_data1.txt ./result1/result1_30.txt 
echo 30
./train 60 model_init.txt seq_model_01.txt ./model/model_01_60.txt
./train 60 model_init.txt seq_model_02.txt ./model/model_02_60.txt
./train 60 model_init.txt seq_model_03.txt ./model/model_03_60.txt
./train 60 model_init.txt seq_model_04.txt ./model/model_04_60.txt
./train 60 model_init.txt seq_model_05.txt ./model/model_05_60.txt
./construct_modellist 60
./test ./modellist/modellist_60.txt testing_data1.txt ./result1/result1_60.txt 
echo 60
./train 100 model_init.txt seq_model_01.txt ./model/model_01_100.txt
./train 100 model_init.txt seq_model_02.txt ./model/model_02_100.txt
./train 100 model_init.txt seq_model_03.txt ./model/model_03_100.txt
./train 100 model_init.txt seq_model_04.txt ./model/model_04_100.txt
./train 100 model_init.txt seq_model_05.txt ./model/model_05_100.txt
./construct_modellist 100
./test ./modellist/modellist_100.txt testing_data1.txt ./result1/result1_100.txt 
echo 100
./train 500 model_init.txt seq_model_01.txt ./model/model_01_500.txt
./train 500 model_init.txt seq_model_02.txt ./model/model_02_500.txt
./train 500 model_init.txt seq_model_03.txt ./model/model_03_500.txt
./train 500 model_init.txt seq_model_04.txt ./model/model_04_500.txt
./train 500 model_init.txt seq_model_05.txt ./model/model_05_500.txt
./construct_modellist 500
./test ./modellist/modellist_500.txt testing_data1.txt ./result1/result1_500.txt 
echo 500
