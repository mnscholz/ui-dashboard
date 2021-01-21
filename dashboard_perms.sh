#!/bin/bash

stripes mod add --tenant diku
stripes mod enable --tenant diku
stripes okapi login diku_admin admin --tenant diku
stripes perm assign --name module.dashboard.enabled  --user diku_admin
stripes perm assign --name settings.dashboard.enabled  --user diku_admin
stripes perm assign --name servint.settings.write  --user diku_admin
stripes perm assign --name servint.refdata.write  --user diku_admin
