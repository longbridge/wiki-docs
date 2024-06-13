# step 1 create basic dirs
# mv all dist to temp dir for backup
mv ./dist/zh-CN /tmp/ && mv ./dist/zh-HK /tmp/ && mv ./dist/en /tmp/

# cp all dist file to dist/en
mkdir -p ./dist/en
mv ./dist/* ./dist/en/
mv /tmp/zh-CN ./dist/ && mv /tmp/zh-HK ./dist/ && mv /tmp/en/* ./dist/en/

# step 3 remove duplicated files
cp -rf ./dist/zh-CN/zh-CN/* ./dist/zh-CN/ && rm -rf ./dist/zh-CN/zh-CN
cp -rf ./dist/zh-HK/zh-HK/* ./dist/zh-HK/ && rm -rf ./dist/zh-HK/zh-HK
