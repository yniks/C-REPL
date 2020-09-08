#include <stdio.h>
#define _GNU_SOURCE
#include <dlfcn.h>

int main(void) {
  printf("Started/n");    
  return 0;
		}

void * store;
void * nikhilesh(char * lib)
{
  return dlopen(lib,RTLD_NOW);
}
