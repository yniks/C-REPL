#include <stdio.h>
#define _GNU_SOURCE
#include <dlfcn.h>
int main(void) {
  printf("Started/n");
  int (*pointer)(int,int)=NULL;
  int result=0;
  if(pointer)
  result=(int)(pointer)(2,3);
  printf("\n\nResult:%d\n",result);    
  return 0;
		}

int add(int a,int b)
{
  int (*pointer)(int,int)=NULL;
  int result=0;
  if(pointer)
  result=(pointer)(a,b);
  return a+b+result;
}
int sub(int a,int b)
{
  int (*pointer)(int,int)=NULL;
  int result=0;
  if(pointer)
  result=(pointer)(a,b);
  return a-b-result;
}
