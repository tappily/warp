define(["warp/matrix"], function(matrix) {
    "use strict";

    var Matrix = matrix.Matrix;

    var calcVector = function (p0, p1) {
        var x = p0[0][0] - p1[0][0];
        var y = p0[1][1] - p1[1][1];
        return [x,y];
    };

    var calcDeterminant = function (p1, p2) {
        return (p1[0] * p2[1] - p1[1] * p2[0]);
    };

    var checkConcave = function(p) {

        var numVertices	= 4,
            v1				= calcVector(p[0],p[numVertices-1]),
            v2				= calcVector(p[1],p[0]),
            detValue		= calcDeterminant(v1,v2),
            curDetValue	= 0;

        for (var i = 1 ; i < numVertices-1 ; i++) {
            v1 = v2;
            v2 = calcVector(p[i+1],p[i]);
            curDetValue = calcDeterminant(v1,v2);

            if( (curDetValue * detValue) < 0.0 ) return false;
        }

        v1 = v2;
        v2 = calcVector(p[0],p[numVertices-1]);
        curDetValue = calcDeterminant(v1,v2);

        return ((curDetValue * detValue) >= 0.0);
    };

    return function (src, dst) {

        // As is 3D, not a Image Distorsion, we have to check for impossible views
        // For example, the polygon can't be Concave.
        if (checkConcave(dst)) {
            return null;
        }

        var a = [[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0]];
        var b = [0,0,0,0,0,0,0,0];

        for( var i = 0; i < 4; i++ ){
            a[i] = [];
            a[i][0] = a[i+4][3] = src[i][0];
            a[i][1] = a[i+4][4] = src[i][1];
            a[i][2] = a[i+4][5] = 1;
            a[i][3] = a[i][4] = a[i][5] =
            a[i+4][0] = a[i+4][1] = a[i+4][2] = 0;
            a[i][6] = -src[i][0]*dst[i][0];
            a[i][7] = -src[i][1]*dst[i][0];
            a[i+4][6] = -src[i][0]*dst[i][1];
            a[i+4][7] = -src[i][1]*dst[i][1];

            b[i] = dst[i][0];
            b[i+4] = dst[i][1];
        }

        var bM = [];
        for(i=0; i<b.length; i++){
            bM[i] = [b[i]];
        }

        // Matrix Libraries from a Java port of JAMA: A Java Matrix Package, http://math.nist.gov/javanumerics/jama/
        // Developed by Dr Peter Coxhead: http://www.cs.bham.ac.uk/~pxc/
        // Available here: http://www.cs.bham.ac.uk/~pxc/js/
        var A = Matrix.create(a);
        var B = Matrix.create(bM);

        return Matrix.solve(A,B);

    };
});
