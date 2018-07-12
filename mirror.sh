#!/bin/bash
set -vex

# -e robots=off: ignore robots.txt
# --mirror: equivalent to -r -N -l inf --no-remove-listing
	# -r: Turn on recursive retrieving. The default maximum depth is 5.
	# -l: Specify recursion maximum depth level depth.
	# -N: Turn on time-stamping.
	# --no-remove-listing Don't remove the temporary .listing files generated by FTP retrievals.
# --no-if-modified-since: Do not send If-Modified-Since header in -N mode. Send preliminary HEAD request instead.
# --convert-links: After the download is complete, convert the links in the document to make them suitable for local viewing.
# --domains: Set domains to be followed. `domain-list` is a comma-separated list of domains.
# --exclude-directories=list
   # Specify a comma-separated list of directories you wish to exclude
   # from download.  Elements of list may contain wildcards.

function join_by { local IFS="$1"; shift; echo "$*"; }

ignore=(
	/admin/
	/catalogcontents/
	/cim/
	/clmail/
	/css/,/archive/*/css/
	/courseadmin/
	/courseleaf/
	/dbleaf/
	/import/
	/images/,/archive/*/images/
	/fonts/,/archive/*/fonts/,/archive/2016-2017/fonts/
	/js/,/archive/*/js/
	/mig/
	/migration/
	/navbar/
	/pagewiz/
	/programadmin/
	/responseform/
	/ribbit/
	/search/,/archive/*/search/
	/sectionrequest/
	/shared/
	/tmp/
	/wen/
	/wiztest/
	/xsearch/
)

ignore_list=$(join_by , ${ignore[*]})

wget \
	-e robots=off \
	--mirror \
	--no-if-modified-since \
	--domains catalog.stolaf.edu \
	--exclude-directories "${ignore_list}" \
	http://catalog.stolaf.edu
