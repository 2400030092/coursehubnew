// placeholder page — no state required yet
import { useParams } from 'react-router-dom';
import { Card, CardContent, CardHeader } from '../components/Card';
import { Button } from '../components/Button';
import { SEO } from '../components/SEO';

export const AssignmentSubmission = () => {
  const { id } = useParams();

  return (
    <div className="p-6">
      <SEO
        title="Submit Assignment"
        description="Submit your assignment for review"
        keywords="assignment submission, submit assignment, student"
      />
      <Card>
        <CardHeader>
          <h1 className="text-2xl font-bold text-gray-900">Assignment Submission</h1>
          <p className="text-gray-600">Assignment ID: {id}</p>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600">Assignment submission functionality will be implemented here.</p>
          <Button className="mt-4">Submit Assignment</Button>
        </CardContent>
      </Card>
    </div>
  );
};

