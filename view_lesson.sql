SELECT cl.id as id_classroom,
	   cl.name as name_classroom, 
	   cl.location as location_classroom,
	   te.id as id_teacher,
	   te.name as name_teacher, 
	   se.id as id_semester, 
	   se.title as title_semester, 
	   cs.id_career as id_career, 
	   cs.id_subject as id_subject,
	   cs.credits as subject_credits, 
	   cs.semester as subject_semster, 
	   ca.name as name_career, 
	   su.name as name_subject, 
	   le.id_career_subject as id_career_subject, 
	   le.schedule as schedule
FROM  public.lessons AS le
INNER JOIN public.classrooms AS cl
    ON cl.id = le.id_classroom 
INNER JOIN public.teachers AS te
    ON te.id = le.id_teacher
INNER JOIN public.semesters AS se
    ON se.id = le.id_classroom
INNER JOIN public.carrersubjects AS cs
	ON cs.id = le.id_career_subject
INNER JOIN public.careers AS ca
    ON ca.id = cs.id_career
INNER JOIN public.subjects AS su
    ON cs.id_subject = su.id
