import React from 'react';
import Layout from '@theme/Layout';


function ProtectedPage() {
  return (
    <Layout title="Protected Content" description="This page requires authentication">
  
        <div className="container margin-vert--lg">
          <div className="row">
            <div className="col col--8 col--offset-2">
              <h1>Protected Content</h1>
              <p>This page is only accessible to authenticated users.</p>
              <p>Welcome to the protected area of our application!</p>
              <div className="margin-vert--lg">
                <a href="/docs/book/course-overview" className="button button--primary button--lg">
                  Continue to Content
                </a>
              </div>
            </div>
          </div>
        </div>
      
    </Layout>
  );
}

export default ProtectedPage;