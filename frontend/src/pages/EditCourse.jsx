// placeholder page — no state required yet
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader } from '../components/Card';
import { Button } from '../components/Button';
import { SEO } from '../components/SEO';

export const EditCourse = () => {
  const { id } = useParams();

  return (
    <div className="p-6">
      <SEO
        title="Edit Course"
        description="Edit your course details and content"
        keywords="edit course, course management, instructor"
      />
      <Card>
        <CardHeader>
          <h1 className="text-2xl font-bold text-gray-900">Edit Course</h1>
          <p className="text-gray-600">Course ID: {id}</p>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">Course editing functionality will be implemented here.</p>
          <Button className="mt-4">Save Changes</Button>
        </CardContent>
      </Card>
    </div>
  );
};
